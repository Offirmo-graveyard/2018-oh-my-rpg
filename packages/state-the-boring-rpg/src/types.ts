import { Weapon } from '@oh-my-rpg/logic-weapons'
import { Armor } from '@oh-my-rpg/logic-armors'

import { State as CharacterState } from '@oh-my-rpg/state-character'
import { State as InventoryState } from '@oh-my-rpg/state-inventory'
import { State as WalletState } from '@oh-my-rpg/state-wallet'

import { State as PRNGState } from '@oh-my-rpg/state-prng'

/////////////////////

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

interface State {
	version: number
	avatar: CharacterState
	inventory: InventoryState
	wallet: WalletState
	prng: PRNGState
	last_adventure: Adventure | null
	click_count: number
	good_click_count: number
}

const VERSION = 7

/////////////////////

export {
	VERSION,
	Adventure,
	State,
}

/////////////////////
