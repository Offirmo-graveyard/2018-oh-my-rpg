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
	agility: number
	health: number
	level: number
	luck: number
	mana: number
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
