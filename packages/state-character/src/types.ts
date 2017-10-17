import { Enum } from 'typescript-string-enums'

/////////////////////

const CharacterAttribute = Enum(
	'agility',
	'health',
	'level',
	'luck',
	'mana',
	'strength',
	'charisma',
	'wisdom',
)
type CharacterAttribute = Enum<typeof CharacterAttribute>

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

interface CharacterAttributes {
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
	attributes: CharacterAttributes
	// TODO inventory here ?

	schema_version: number
}

/////////////////////

export {
	CharacterAttribute,
	CharacterClass,
	CharacterAttributes,
	State,
}

/////////////////////
