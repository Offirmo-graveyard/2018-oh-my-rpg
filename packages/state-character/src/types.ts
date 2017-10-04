import { Enum } from 'typescript-string-enums'

/////////////////////

const CharacterStat = Enum(
	'agility',
	'health',
	'level',
	'luck',
	'mana',
	'strength',
	'charisma',
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

interface Attributes {
	level: number

	health: number
	mana: number

	strength: number
	agility: number
	charisma: number
	wisdom: number
	luck: number
}

interface State {
	name: string
	klass: CharacterClass
	attributes: Attributes
	// inventory here ?
}

/////////////////////

export {
	CharacterStat,
	CharacterClass,
	Attributes,
	State,
}

/////////////////////
