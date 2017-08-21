/////////////////////

import {
	CharacterStat,
	CharacterClass,
	State,
} from './types'

/////////////////////

const CHARACTER_STATS = [
	CharacterStat.level,

	CharacterStat.health,
	CharacterStat.mana,

	CharacterStat.strength,
	CharacterStat.agility,
	CharacterStat.charisma,
	CharacterStat.wisdom,
	CharacterStat.luck,
]

///////

function factory(): State {
	return {
		name: '[anonymous]',
		klass: CharacterClass.novice,
		characteristics: {
			level: 1,

			// TODO improve this
			health: 1,
			mana: 0,

			strength: 1,
			agility: 1,
			charisma: 1,
			wisdom: 1,
			luck: 1
		}
	}
}

/////////////////////

function rename(state: State, new_name: string): State {
	if (!new_name)
		throw new Error(`Error while renaming to "${new_name}: invalid value!`)

	state.name = new_name

	return state
}

function increase_stat(state: State, stat: CharacterStat, amount = 1): State {
	if (amount <= 0)
		throw new Error(`Error while increasing stat "${stat}: invalid amount!`)

	// TODO stats caps
	state.characteristics[stat] += amount

	return state
}

/////////////////////

export {
	CharacterStat,
	CharacterClass,
	State,

	CHARACTER_STATS,
	factory,
	increase_stat,
}

/////////////////////
