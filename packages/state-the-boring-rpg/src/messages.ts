
import * as RichText from '@oh-my-rpg/rich-text-format'

import {
	State,
	GainType,
	Adventure,
} from './types'

function get_recap(state: Readonly<State>): RichText.Document {
	const isNewGame = (state.meaningful_interaction_count === 0)
	if (isNewGame) {
		return RichText.paragraph()
			.pushText(''
				+ 'Great sages prophesied your coming,{{br}}'
				+ 'commoners are waiting for their hero{{br}}'
				+ 'and kings are trembling from fear of change...{{br}}'
				+ '…undoubtedly, you’ll make a name in this world and fulfill your destiny!{{br}}'
				+ '{{br}}'
			)
			.pushStrong('A great saga just started.')
			.done()
	}

	return RichText.paragraph()
		.pushText('TODO recap')
		.done()
}

function get_tip(state: Readonly<State>): RichText.Document | null {
	const hasEverPlayed = !!state.click_count

	if(!hasEverPlayed)
		return RichText.paragraph()
			.pushStrong('Tip: ')
			.pushText('Select ')
			.pushStrong('play')
			.pushText(' to start adventuring!')
			.done()

	return null
}

export {
	get_recap,
	get_tip,
}


/*
	const MSG_INTRO = {
		type: 'simple_message',
		msg_main: stylize_string.bold(`Congratulations, adventurer!\n`)
		+ `Your are more courageous, cunning and curious than your peers:
You dared to enter this unknown realm, for glory and adventures! (and loot 💰 ;)`,
	}


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

 */
