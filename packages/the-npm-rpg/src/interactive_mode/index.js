"use strict";

const tbrpg = require('@oh-my-rpg/state-the-boring-rpg')
const { iterables_unslotted, get_item_at_coordinates, get_item_in_slot } = require('@oh-my-rpg/state-inventory')
const { factory: tty_chat_ui_factory } = require('@oh-my-rpg/view-chat/src/ui/tty')
const { factory: chat_factory } = require('@oh-my-rpg/view-chat')
const { CHARACTER_CLASSES } = require('@oh-my-rpg/state-character')
const {
	render_item,
	render_character_sheet,
	render_full_inventory,
	render_adventure,
} = require('@oh-my-rpg/view-rich-text')

const { rich_text_to_ansi } = require('../utils/rich_text_to_ansi')
const { stylize_string } = require('../libs')
const { render_header } = require('../view')
const { prettify_json_for_debug } = require('../utils/debug')
const {
	play,
	equip_item_at_coordinates,
	sell_item_at_coordinates,
	rename_avatar,
	change_class,
} = require('../actions')

function get_recap({config}) {
	const state = config.store
	return rich_text_to_ansi(tbrpg.get_recap(state))
}

function get_tip({config}) {
	const state = config.store
	const tip = tbrpg.get_tip(state)
	return tip && rich_text_to_ansi(tip)
}



function start_loop(options) {
	const DEBUG = options.verbose
	if (DEBUG) console.log('all options:', prettify_json_for_debug(options))

	render_header(options)

	const {config} = options
	//const state = config.store

	function* gen_next_step() {
		const chat_state = {
			count: 0,
			mode: 'main',
			sub: {
				main: {},
				inventory: {},
				character: {},
			}
		}

		let yielded

		// intro
		chat_state.count++
		yielded = yield {
			type: 'simple_message',
			msg_main: get_recap(options),
		}

		// how to quit
		chat_state.count++
		yielded = yield {
			type: 'simple_message',
			msg_main: `Note: Press ${stylize_string.inverse(' Ctrl+C ')} at anytime to ${stylize_string.red('quit')}, your game is auto-saved.`,
		}

		// tip
		let tip_msg = get_tip(options)
		if (tip_msg) {
			chat_state.count++
			yielded = yield {
				type: 'simple_message',
				msg_main: tip_msg,
			}
		}


		function get_MODE_MAIN() {
			const steps = []

			const state = config.store
			//console.log(state)
			const { good_click_count, last_adventure } = state

			if (state.last_adventure && chat_state.sub.main.last_adventure !== state.last_adventure) {
				const { good_click_count, last_adventure } = state
				//console.log({ good_click_count, last_adventure })
				let msg_main = `Episode #${good_click_count}:\n`
				const $doc = render_adventure(last_adventure)
				msg_main += rich_text_to_ansi($doc)
				chat_state.sub.main.last_adventure = state.last_adventure
				steps.push({
					type: 'simple_message',
					msg_main,
				})
			}

			// TODO add possible tip action

			steps.push({
				msg_main: `What do you want to do?`,
				callback: value => { chat_state.mode = value },
				choices: [
					{
						msg_cta: 'Play!',
						value: 'play',
						msgg_as_user: () => 'Let’s go adventuring!',
						callback: () => {
							play(options)
						},
					},
					{
						msg_cta: 'Manage Inventory (equip, sell…)',
						value: 'inventory',
						msgg_as_user: () => 'Let’s sort out my stuff.',
						msgg_acknowledge: () => `Sure.`,
					},
					{
						msg_cta: 'Manage Character (rename, change class…)',
						value: 'character',
						msgg_as_user: () => 'Let’s see how I’m doing!',
					},
				],
			})

			return steps
		}

		function get_MODE_INVENTORY() {
			const steps = []
			let msg_main = `What do you want to do?`
			const choices = []

			const state = config.store

			if (chat_state.sub.inventory.selected) {
				const coords = chat_state.sub.inventory.selected - 1
				const selected_item = get_item_at_coordinates(state.inventory, coords)
				const sell_price = tbrpg.appraise_item_at_coordinates(state, coords)
				const item_ascii_full = rich_text_to_ansi(render_item(selected_item))

				steps.push({
					type: 'simple_message',
					msg_main: 'You inspect the ' + item_ascii_full + ' in your backpack.'
				})

				const slot = selected_item.slot
				const equipped_item_in_same_slot = get_item_in_slot(state.inventory, slot)
				if (!equipped_item_in_same_slot) {
					steps.push({
						type: 'simple_message',
						msg_main: `You currently have no item equipped for this category (${slot}).`
					})
				}
				else {
					steps.push({
						type: 'simple_message',
						msg_main: `You compare it to your currently equipped ${slot}: ` + rich_text_to_ansi(render_item(equipped_item_in_same_slot))
					})
				}

				choices.push({
					msg_cta: 'Equip it.',
					value: 'equip',
					msgg_as_user: () => 'I want to equip it.',
					msgg_acknowledge: () => 'Done!',
					callback: () => {
						equip_item_at_coordinates(options, coords)
						chat_state.sub.inventory = {}
					}
				})
				choices.push({
					msg_cta: `Sell it for ${sell_price} coins.`,
					value: 'sell',
					msgg_as_user: () => `Deal for ${sell_price} coins.`,
					msgg_acknowledge: () => `Here are you ${sell_price} coins. Please to do business with you!`,
					callback: () => {
						sell_item_at_coordinates(options, coords)
						chat_state.sub.inventory = {}
					}
				})

				choices.push({
					msg_cta: 'Go back to inventory.',
					key_hint: { name: 'x' },
					value: 'exit',
					msgg_as_user: () => 'I’m done with it.',
					msgg_acknowledge: () => 'OK. Here is your inventory:',
					callback: () => {
						chat_state.sub.inventory = {}
					}
				})
			}
			else {
				const $doc = render_full_inventory(state.inventory, state.wallet)
				steps.push({
					type: 'simple_message',
					msg_main: 'Here is your full inventory:\n' + rich_text_to_ansi($doc)
				})

				const misc_items = Array.from(iterables_unslotted(state.inventory))
				misc_items.forEach((item, index) => {
					if (!item) return

					const item_ascii = rich_text_to_ansi(render_item(item, {
						display_quality: true,
						display_values: false,
					}))
					choices.push({
						msg_cta: 'Select ' + item_ascii,
						value: index,
						key_hint: {
							name: String.fromCharCode(97 + index),
						},
						msgg_as_user: () => 'I inspect ' + item_ascii,
						callback: value => {
							chat_state.sub.inventory.selected = value + 1 // to avoid 0
						},
					})
				})

				choices.push({
					msg_cta: 'Go back to adventuring.',
					key_hint: { name: 'x' },
					value: 'x',
					msgg_as_user: () => 'Let’s do something else.',
					callback: () => {
						chat_state.sub.inventory = {}
						chat_state.mode = 'main'
					}
				})
			}

			steps.push({
				msg_main,
				choices,
			})

			return steps
		}

		function get_MODE_CHARACTER() {
			const steps = []
			const state = config.store

			let msg_main = 'TODO char step'
			const choices = []

			if (chat_state.sub.character.changeClass) {
				msg_main = 'Choose your path wisely:'

				CHARACTER_CLASSES.forEach(klass => {
					if (klass === 'novice') return

					choices.push({
						msg_cta: `Switch class to ${klass}`,
						value: klass,
						msgg_as_user: () => `I want to follow the path of the ${klass}!`,
						msgg_acknowledge: name => `You’ll make an amazing ${klass}.`,
						callback: value => {
							change_class(options, value)
							chat_state.sub.character = {}
						}
					})
				})
			}
			else if (chat_state.sub.character.rename) {
				return [{
					type: 'ask_for_string',
					msg_main: `What’s your name?`,
					msgg_as_user: value => `My name is "${value}".`,
					msgg_acknowledge: name => `You are now known as ${name}!`,
					callback: value => {
						rename_avatar(options, value)
						chat_state.sub.character = {}
					},
				}]
			}
			else {
				const $doc = render_character_sheet(state.avatar)
				steps.push({
					type: 'simple_message',
					msg_main: 'Here is your character sheet:\n\n' + rich_text_to_ansi($doc)
				})

				msg_main = `What do you want to do?`

				choices.push(
					{
						msg_cta: 'Change class',
						value: 'c',
						msgg_as_user: () => 'I want to follow the path of…',
						callback: () => {
							chat_state.sub.character.changeClass = true
						}
					},
					{
						msg_cta: 'Rename hero',
						value: 'r',
						msgg_as_user: () => 'Let’s fix my name…',
						callback: () => {
							chat_state.sub.character.rename = true
						}
					},
					{
						msg_cta: 'Go back to adventuring.',
						key_hint: { name: 'x' },
						value: 'x',
						msgg_as_user: () => 'Let’s do something else.',
						callback: () => {
							chat_state.sub.character = {}
							chat_state.mode = 'main'
						}
					},
				)
			}

			steps.push({
				msg_main,
				choices,
			})

			return steps
		}

		if (DEBUG) console.log(prettify_json_for_debug(chat_state))
		let shouldExit = false
		let loopDetector = 0
		do {
			switch(chat_state.mode) {
				case 'main':
					chat_state.count++
					yielded = yield* get_MODE_MAIN()
					break
				case 'inventory':
					chat_state.count++
					yielded = yield* get_MODE_INVENTORY()
					break
				case 'character':
					chat_state.count++
					yielded = yield* get_MODE_CHARACTER()
					break
				default:
					console.error(`Unknown mode: "${chat_state.mode}"`)
					process.exit(1)
			}

			if (chat_state.count % 10 === 0) {
				const now = Date.now()
				if ((now - loopDetector) < 1000) {
					// loop detected: it's a bug
					throw new Error('Loop detected in chat interface')
				}
				loopDetector = now
			}
		} while(!shouldExit)
	}

	const chat = chat_factory({
		DEBUG: false,
		gen_next_step: gen_next_step(),
		ui: tty_chat_ui_factory({DEBUG: false}),
	})

	return chat
		.start()
		.then(() => console.log('Bye!'))
}


module.exports = {
	start_loop,
}
