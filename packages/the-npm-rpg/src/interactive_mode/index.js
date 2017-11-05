"use strict";

const tbrpg = require('@oh-my-rpg/state-the-boring-rpg')
const { iterables_unslotted, get_item_at_coordinates } = require('@oh-my-rpg/state-inventory')
const { factory: tty_chat_ui_factory } = require('@oh-my-rpg/view-chat/src/ui/tty')
const { factory: chat_factory } = require('@oh-my-rpg/view-chat')
const { CHARACTER_CLASSES } = require('@oh-my-rpg/state-character')
const {
	render_item,
	render_character_sheet,
	render_full_inventory,
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
			mode: 'character',
			sub: {
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
			// TODO add tip action
			return {
				msg_main: `What do you want to do?`,
				callback: value => { chat_state.mode = value },
				choices: [
					{
						msg_cta: 'Play!',
						value: 'play',
						msgg_as_user: () => 'Let’s go adventuring!',
						callback: () => console.log('TODO play')
					},
					{
						msg_cta: 'Manage Inventory (equip, sell…)',
						value: 'inventory',
						msgg_as_user: () => 'Let’s sort out my stuff.',
						msgg_acknowledge: () => `Sure. Here is your full inventory:`,
					},
					{
						msg_cta: 'Manage Character (rename, change class…)',
						value: 'character',
						msgg_as_user: () => 'Let’s see how I’m doing!',
					},
				],
			}
		}

		function get_MODE_INVENTORY() {
			const state = config.store

			let msg_main = 'TODO inv step'
			const choices = []

			if (chat_state.sub.inventory.selected) {
				const coords = chat_state.sub.inventory.selected - 1
				const selected_item = get_item_at_coordinates(state.inventory, coords)
				const sell_price = tbrpg.appraise_item_at_coordinates(state, coords)
				const item_ascii = rich_text_to_ansi(render_item(selected_item, {
					display_quality: true,
					display_values: false,
				}))

				msg_main = 'What do you want to do with your ' + item_ascii + '?'

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
					msg_cta: `Sell for ${sell_price} coins.`,
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
				msg_main = 'Here is your inventory:\n' + rich_text_to_ansi($doc) + `\nWhat do you want to do?`
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

			return {
				msg_main,
				choices,
			}
		}

		function get_MODE_CHARACTER() {
			const state = config.store

			let msg_main = 'TODO char step'
			const choices = []


			if (chat_state.sub.character.changeClass) {
				CHARACTER_CLASSES.forEach(klass => {
					if (klass === 'novice') return

					const msg_cta = (klass === state.avatar.klass)
							? `Stay a ${klass}`
							: `Switch class to ${klass}`

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
				return {
					type: 'ask_for_string',
					msg_main: `What’s your name?`,
					msgg_as_user: value => `My name is "${value}".`,
					msgg_acknowledge: name => `You are now known as ${name}!`,
					callback: value => {
						rename_avatar(options, value)
						chat_state.sub.character = {}
					},
				}
			}
			else {
				const $doc = render_character_sheet(state.avatar)
				msg_main = 'Here is your character sheet:\n\n' + rich_text_to_ansi($doc) + `\nWhat do you want to do?`

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

			return {
				msg_main,
				choices,
			}
		}

		// main step
		do {
			if (DEBUG) console.log(prettify_json_for_debug(chat_state))
			switch(chat_state.mode) {
				case 'main':
					chat_state.count++
					yielded = yield get_MODE_MAIN()
					break
				case 'inventory':
					chat_state.count++
					yielded = yield get_MODE_INVENTORY()
					break
				case 'character':
					chat_state.count++
					yielded = yield get_MODE_CHARACTER()
					break
				default:
					console.error(`Unknown mode: "${chat_state.mode}"`)
					process.exit(1)
			}
		} while (chat_state.count < 10)

		/*yield* [

			{
				type: 'ask_for_string',
				msg_main: `What's your name?`,
				//validator: null, // TODO
				msgg_as_user: value => `My name is "${value}".`,
				msgg_acknowledge: name => `Thanks for the answer, ${name}!`,
				callback: value => { state.name = value }
			},
			{
				type: 'ask_for_string',
				msg_main: `What city do you live in?`,
				msgg_as_user: value => `I live in "${value}".`,
				msgg_acknowledge: value => `${value}, a fine city indeed!`,
				callback: value => { state.city = value }
			},
			{
				type: 'simple_message',
				msg_main: `Please wait for a moment...`,
			},
			// TODO wait with feedback
			/*{
               type: 'delay',
               msg_main: `Please wait for a moment...`,
           },*/
			/*{
				msg_main: `Make your choice`,
				callback: value => { state.mode = value },
				choices: [
					{
						msg_cta: 'Choice 1',
						value: 1,
					},
					{
						msg_cta: 'Choice 2',
						value: 2,
					},
				]
			}
		]*/

		/*
           {
               type: 'ask_for_confirmation',
               //msgg_main: name => `Do you confirm?`,
               callback: value => { }
           },
        */
	}

	const chat = chat_factory({
		DEBUG: false,
		gen_next_step: gen_next_step(),
		ui: tty_chat_ui_factory({DEBUG: false}),
	})

	return chat.start()
}


module.exports = {
	start_loop,
}
