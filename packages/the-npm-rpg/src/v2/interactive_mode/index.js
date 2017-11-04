"use strict";

const tbrpg = require('@oh-my-rpg/state-the-boring-rpg')
const { factory: tty_chat_ui_factory } = require('@oh-my-rpg/view-chat/src/ui/tty')
const { factory: chat_factory } = require('@oh-my-rpg/view-chat')
const {
	render_equipment,
	render_wallet,
	render_full_inventory,
} = require('@oh-my-rpg/view-text')

const { rich_text_to_ansi } = require('../utils/rich_text_to_ansi')
const { stylize_string } = require('../libs')
const { render_header } = require('../view')
const { prettify_json_for_debug } = require('../utils/debug')

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
		}

		const MODE_MAIN = {
			msg_main: `What do you want to do?`,
			callback: value => { chat_state.mode = value },
			choices: [
				{
					msg_cta: 'Play',
					value: 'play',
					msgg_as_user: () => 'Let’s go adventuring!',
					callback: () => console.log('TODO play')
				},
				{
					msg_cta: 'Manage Inventory',
					value: 'inventory',
					msgg_as_user: () => 'Let’s sort out my stuff.',
				},
				{
					msg_cta: 'Manage Character',
					value: 'character',
					msgg_as_user: () => 'Let’s see how I’m doing!',
				},
			]
		}

		function get_MODE_INVENTORY() {
			const state = config.store
			const $doc = render_full_inventory(state.inventory, state.wallet)

			return {
				msg_main: rich_text_to_ansi($doc) + `\nWhat do you want to do?`,
				choices: [
					{
						msg_cta: 'Go back to adventuring.',
						value: 'x',
						msgg_as_user: () => 'Let’s do something else.',
						callback: () => chat_state.mode = 'main',
					},
				]
			}
			/*
			inventory: [
				{
					key: '[a-t]',
					key_for_display: 'a↔t',
					description: 'select inventory slot a…t for equipping, selling…',
					cb(key) {
						const selected_item_index = key.charCodeAt(0) - 97
						if (!does_item_exist_at_coordinate(options, selected_item_index))
							return
						ui_state = ui.select_item(ui_state, selected_item_index)
						ui_state = ui.switch_screen(ui_state, 'inventory_select')
					},
				},
				{
					key: 'x',
					description: 'go back to adventuring!',
					cb() { ui_state = ui.switch_screen(ui_state, 'adventure') }
				},
			],
			*/
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

		// main step
		do {
			if (true && DEBUG) console.log({state: chat_state})
			switch(chat_state.mode) {
				case 'main':
					chat_state.count++
					yielded = yield MODE_MAIN
					break
				case 'inventory':
					chat_state.count++
					yielded = yield get_MODE_INVENTORY()
					break
				case 'character':
					chat_state.count++
					yielded = yield get_MODE_INVENTORY()
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
