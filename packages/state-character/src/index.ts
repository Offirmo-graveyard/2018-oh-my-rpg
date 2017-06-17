/////////////////////

import {
	CharacterStat,
	State,
} from './types'

/////////////////////

function factory(): State {
	return {
		level: 1,

		health: 1,
		mana: 0,

		strength: 1,
		agility: 1,
		vitality: 1,
		wisdom: 1,
		luck: 1
	}
}

/////////////////////

function increase_stat(state: State, stat: CharacterStat, amount = 1): State {
	if (amount <= 0)
		throw new Error(`Error while increasing stat "${stat}: invalid amount!`)

	state[stat] += amount

	return state
}

/////////////////////

export {
	CharacterStat,
	State,

	factory,
	increase_stat,
}

/////////////////////
