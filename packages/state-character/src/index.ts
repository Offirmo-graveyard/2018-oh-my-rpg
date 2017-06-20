/////////////////////

import {
	CharacterStat,
	State,
} from './types'

/////////////////////

const CHARACTER_STATS = [
	CharacterStat.agility,
	CharacterStat.health,
	CharacterStat.level,
	CharacterStat.luck,
	CharacterStat.mana,
	CharacterStat.strength,
	CharacterStat.vitality,
	CharacterStat.wisdom,
]

///////

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

	CHARACTER_STATS,
	factory,
	increase_stat,
}

/////////////////////
