import { Enum } from 'typescript-string-enums'

/////////////////////

const CoinsGain = Enum(
	'none',
	'small',
	'medium',
	'big',
	'huge',
)
type CoinsGain = Enum<typeof CoinsGain>

interface AdventureArchetype {
	published: boolean | undefined
	hid: string
	good: boolean
	post: {
		gains: {
			// keys must match characteristics
			level: boolean
			health: number
			mana: number

			strength: number
			agility: number
			charisma: number
			wisdom: number
			luck: number
			random_charac: number
			class_main_charac: number
			class_secondary_charac: number

			coins: CoinsGain
			tokens: number

			armor: boolean
			weapon: boolean
			armor_or_weapon: boolean

			// key radix must match item slots
			armor_improvement: boolean
			weapon_improvement: boolean
			armor_or_weapon_improvement: boolean
		}
	}
}

/////////////////////

export {
	CoinsGain,
	AdventureArchetype,
}

/////////////////////
