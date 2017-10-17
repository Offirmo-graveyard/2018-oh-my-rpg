
const { factory: tty_chat_ui_factory } = require('@oh-my-rpg/view-chat/src/ui/tty')
const { factory: chat_factory } = require('@oh-my-rpg/view-chat')

const { prettifyJson } = require('../deps')

function get_recap({config}) {
	const state = config.store
	console.log('state', prettifyJson(state), '---')
	const {good_click_count} = state

	if (good_click_count === 0)
		return stylizeString.bold(`Congratulations, adventurer!\n`)
			+ `Your are more courageous, cunning and curious than your peers:
You dared to enter this unknown realm, for glory and adventures! (and loot 💰 ;)

Great sages prophetized your coming,
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
	return `The great saga of ${stylizeString.bold(state.avatar.name)}, ${state.avatar.klass} LVL${level}
HEALTH:${health} MANA:${mana} STR:${strength} AGI:${agility} CHA:${charisma} WIS:${wisdom} LUCK:${luck}`
}




function start_loop(options) {
	const DEBUG = !!options.verbose

	function* gen_next_step() {
		const state = {
			count: 0,
			mode: 'main',
		}

		let yielded

		console.log('all', prettifyJson(options), '---')
		do {
			yielded = yield {
				type: 'simple_message',
				msg_main: get_recap(options),
			}
		} while (true)

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
		DEBUG,
		gen_next_step: gen_next_step(),
		ui: tty_chat_ui_factory({DEBUG}),
	})

	return chat.start()
}


module.exports = {
	start_loop,
}
