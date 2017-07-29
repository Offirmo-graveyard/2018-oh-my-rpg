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

const CharacterClass = Enum(
	'novice',
	'warrior',
	'barbarian',
	'paladin',
	'sculptor',
	'pirate',
	'ninja',
	'rogue',
	'wizard',
	'hunter',
	'druid',
	'priest',
)
type CharacterClass = Enum<typeof CharacterClass>

/////////////////////

interface Characteristics {
	level: number

	health: number
	mana: number

	strength: number
	agility: number
	vitality: number
	wisdom: number
	luck: number
}

interface State {
	name: string
	klass: CharacterClass
	characteristics: Characteristics
	// inventory here ?
}

/////////////////////

export {
	CharacterStat,
	CharacterClass,
	Characteristics,
	State,
}

/////////////////////
