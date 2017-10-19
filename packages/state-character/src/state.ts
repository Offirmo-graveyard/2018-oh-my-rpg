/////////////////////

import { Enum } from 'typescript-string-enums'

import { LIB_ID, SCHEMA_VERSION } from './consts'

import {
	CharacterAttribute,
	CharacterClass,
	CharacterAttributes,
	State,
} from './types'

/////////////////////

const CHARACTER_STATS = Enum.keys(CharacterAttribute)

///////

function factory(): State {
	return {
		name: '[anonymous]',
		klass: CharacterClass.novice,
		attributes: {
			level: 1,

			// TODO improve this
			health: 1,
			mana: 0,

			strength: 1,
			agility: 1,
			charisma: 1,
			wisdom: 1,
			luck: 1
		},

		schema_version: SCHEMA_VERSION,
	}
}

/////////////////////

function rename(state: State, new_name: string): State {
	if (!new_name)
		throw new Error(`${LIB_ID}: Error while renaming to "${new_name}: invalid value!`)

	state.name = new_name

	return state
}

function switch_class(state: State, klass: CharacterClass): State {
	state.klass = klass

	return state
}

function increase_stat(state: State, stat: CharacterAttribute, amount = 1): State {
	if (amount <= 0)
		throw new Error(`${LIB_ID}: Error while increasing stat "${stat}: invalid amount!`)

	// TODO stats caps
	state.attributes[stat] += amount

	return state
}

/////////////////////

export {
	CharacterAttribute,
	CharacterClass,
	CharacterAttributes,
	State,

	CHARACTER_STATS,
	factory,
	rename,
	switch_class,
	increase_stat,
}

/////////////////////
