"use strict";

const tbrpg = require('@oh-my-rpg/state-the-boring-rpg')
const { factory: tty_chat_ui_factory } = require('@oh-my-rpg/view-chat/src/ui/tty')
const { factory: chat_factory } = require('@oh-my-rpg/view-chat')

const { rich_text_to_ansi } = require('../utils/rich_text_to_ansi')

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

	const {config} = options
	//const state = config.store

	function* gen_next_step() {
		const state = {
			count: 0,
			mode: 'main',
		}

		const MODE_MAIN = {
			msg_main: `What do you want to do?`,
			callback: value => { console.log({value}); state.mode = value},
			choices: [
				{
					msg_cta: 'Play',
					value: 'play',
					msgg_as_user: () => 'Let’s play!',
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
			// TOTO display inventory
			return {
				msg_main: `What do you want to do?`,
				choices: [
					{
						msg_cta: 'Go back to adventuring.',
						value: 'x',
						msgg_as_user: () => 'Let’s do something else.',
						callback: () => state.mode = 'main',
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
		state.count++
		yielded = yield {
			type: 'simple_message',
			msg_main: get_recap(options),
		}

		// tip
		let tip_msg = get_tip(options)
		if (tip_msg) {
			state.count++
			yielded = yield {
				type: 'simple_message',
				msg_main: tip_msg,
			}
		}

		// main step
		do {
			console.log(state)
			switch(state.mode) {
				case 'main':
					state.count++
					yielded = yield MODE_MAIN
					break
				case 'inventory':
					state.count++
					yielded = yield get_MODE_INVENTORY()
					break
				case 'character':
					state.count++
					yielded = yield get_MODE_INVENTORY()
					break
				default:
					console.error(`Unknown mode: "${state.mode}"`)
					process.exit(1)
			}
		} while (state.count < 10)

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
