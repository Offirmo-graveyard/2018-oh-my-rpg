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
			level: boolean
			agility: number
			health: number
			luck: number
			mana: number
			strength: number
			vitality: number
			wisdom: number
			coins: CoinsGain
			tokens: number
			armor: boolean
			weapon: boolean
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
