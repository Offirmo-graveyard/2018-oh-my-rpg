import { Weapon } from '@oh-my-rpg/logic-weapons'
import { Armor } from '@oh-my-rpg/logic-armors'

import { State as CharacterState } from '@oh-my-rpg/state-character'
import { State as InventoryState } from '@oh-my-rpg/state-inventory'

import { State as PRNGState } from '@oh-my-rpg/state-prng'

/////////////////////

interface State {
	characteristics: CharacterState
	inventory: InventoryState
	prng: PRNGState
}

interface Adventure {
	hid: string
	good: boolean
	gains: {
		level: number
		health: number
		mana: number
		strength: number
		agility: number
		vitality: number
		wisdom: number
		luck: number
		coins: number
		tokens: number
		weapon: null | Weapon
		armor: null | Armor
		improved_weapon: boolean
		improved_armor: boolean
	}
}

/////////////////////

export {
	State,
	Adventure,
}

/////////////////////
