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
			vitality: number
			wisdom: number
			luck: number

			coins: CoinsGain
			tokens: number

			armor: boolean
			weapon: boolean

			// key radix must match item slots
			armor_improvement: boolean
			weapon_improvement: boolean
		}
	}
}

/////////////////////

export {
	CoinsGain,
	AdventureArchetype,
}

/////////////////////
