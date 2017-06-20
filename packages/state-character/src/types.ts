import { Enum } from 'typescript-string-enums'

/////////////////////

const CharacterStat = Enum(
	'agility',
	'health',
	'level',
	'luck',
	'mana',
	'strength',
	'vitality',
	'wisdom',
)
type CharacterStat = Enum<typeof CharacterStat>

/////////////////////

interface State {
	level: number

	health: number
	mana: number

	agility: number
	luck: number
	strength: number
	vitality: number
	wisdom: number
}

/////////////////////

export {
	CharacterStat,
	State,
}

/////////////////////
