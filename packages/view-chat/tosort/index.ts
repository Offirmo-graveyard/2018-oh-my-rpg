/////////////////////

import { Enum } from 'typescript-string-enums'

import {
	KeySequence,
	ActionCallback,
	Action,
	Mode,
} from './types'


/////////////////////

interface Options {
	initial_mode: Mode<any>
	get_actions_for_mode(mode: Mode<any>): Promise<Action[]>
	display_message(msg: string): Promise<void>
	display_possible_actions_and_wait_for_one(actions: Action[]): Promise<void>
}

interface Chat {
	start: () => Promise<void>
}

function create(o: Options): Chat {

	async function start(): Promise<void> {
		let mode = o.initial_mode
		await o.display_message(mode.recap_message)
		let actions = await o.get_actions_for_mode(mode)
		await o.display_possible_actions_and_wait_for_one(actions)
	}

	return {
		start,
	}
}

/////////////////////

export {
	KeySequence,
	ActionCallback,
	Action,
	Mode,

	Options,
	Chat,
	create,
}

/////////////////////
