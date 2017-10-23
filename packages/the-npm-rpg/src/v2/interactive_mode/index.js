
const { factory: tty_chat_ui_factory } = require('@oh-my-rpg/view-chat/src/ui/tty')
const { factory: chat_factory } = require('@oh-my-rpg/view-chat')

const { stylize_string } = require('../libs')
const { prettify_json_for_debug } = require('../utils')

function is_first_launch({config}) {
	const state = config.store
	const {good_click_count} = state

	return (good_click_count === 0)
}


function get_recap({config}) {
	const state = config.store
	//console.log('state', prettify_json_for_debug(state))
	const {good_click_count} = state

	if (good_click_count === 0)
		return `Great sages prophetized your coming,
commoners are waiting for their hero
and kings are trembling from fear of change...
..undoubtly, you'll make a name in this world and fulfill your destiny!

A great saga just started...`

	const {
		level,
		health,
		mana,
		strength,
		agility,
		charisma,
		wisdom,
		luck,
	} = state.avatar.attributes
	return `The great saga of ${stylize_string.bold(state.avatar.name)}, ${state.avatar.klass} LVL${level}
HEALTH:${health} MANA:${mana} STR:${strength} AGI:${agility} CHA:${charisma} WIS:${wisdom} LUCK:${luck}`
}




function start_loop(options) {
	const DEBUG = options.verbose
	if (DEBUG) console.log('all options:', prettify_json_for_debug(options))

	const state = {
		count: 0,
		mode: 'main',
	}

	const MSG_INTRO = {
		type: 'simple_message',
		msg_main: stylize_string.bold(`Congratulations, adventurer!\n`)
		+ `Your are more courageous, cunning and curious than your peers:
You dared to enter this unknown realm, for glory and adventures! (and loot 💰 ;)`,
	}


	const MODE_MAIN = {
		msg_main: `What do you want to do?`,
		callback: value => state.mode = value,
		choices: [
			{
				msg_cta: 'Play',
				value: 'play',
				msgg_as_user: () => 'Let’s play!',
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

	function* gen_next_step() {
		const state = {
			count: 0,
			mode: 'main',
		}

		let yielded

		if (is_first_launch(options)) {
			state.count++
			yielded = yield MSG_INTRO
		}

		state.count++
		yielded = yield {
			type: 'simple_message',
			msg_main: get_recap(options),
		}

		do {
			state.count++
			yielded = yield MODE_MAIN
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
