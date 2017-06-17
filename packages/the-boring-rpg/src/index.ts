/////////////////////

import {
	InventorySlot,
	ItemQuality,
	Item,
} from '@oh-my-rpg/definitions'

import {
	InventoryCoordinates,
	factory as inventory_state_factory,
	add_item as inventory_add_item,
	equip_item as inventory_equip_item,
} from '@oh-my-rpg/state-inventory'

import {
	factory as prng_state_factory,
	set_seed as prng_set_seed,
	update_use_count as prng_update_use_count,
	get_prng,
} from '@oh-my-rpg/state-prng'

import {
	factory as weapon_factory
} from '@oh-my-rpg/logic-weapons'

import {
	factory as armor_factory
} from '@oh-my-rpg/logic-armors'

import {
	State,
} from './types'


/////////////////////

function factory(): State {
	let state = {
		inventory: inventory_state_factory(),
		prng: prng_state_factory(),
	}

	let prng = get_prng(state.prng)

	const start_weapon = weapon_factory(prng, {
		base_hid: 'spoon',
		qualifier1_hid: 'used',
		qualifier2_hid: 'noob',
		quality: ItemQuality.common,
		base_strength: 1,
	})
	state = receive_item(state, start_weapon)
	state = equip_item(state, 0)

	const start_armor = armor_factory(prng, {
		base_hid: 'socks',
		qualifier1_hid: 'used',
		qualifier2_hid: 'noob',
		quality: 'common',
	})
	state = receive_item(state, start_armor)
	state = equip_item(state, 0)

	//state.prng = prng_update_use_count(state.prng, prng)

	return state
}

/////////////////////

function receive_item(state: State, item: Item): State {
	state.inventory = inventory_add_item(state.inventory, item)
	return state
}

function equip_item(state: State, coordinates: InventoryCoordinates): State {
	state.inventory = inventory_equip_item(state.inventory, coordinates)
	return state
}

/////////////////////


function play(state: State): State {
	// TODO
	return state
}


function factory(rng: Engine, archetype: AdventureArchetype): Adventure {
	const { hid, good } = archetype
	const { agility, health, luck, mana, strength, vitality, wisdom, tokens } = archetype.post.gains

	return {
		hid,
		good,
		gains: {
			level: number
			health,
			mana,
			strength,
			agility,
			vitality,
			wisdom,
			luck,
			coins: number
			tokens,
			weapon: null | Weapon
			armor: null | Armor
			improved_weapon_index: null | number
			improved_armor_index: null | number
		}
	}
}

/////////////////////

// for demo purpose, all characteristics having the same probability + also random enhancement level
function generate_random_demo_adventure(): Adventure {
	const rng: Engine = Random.engines.mt19937().autoSeed()
	const archetype = pick_random_archetype(rng)
	return factory(rng, archetype)
}
/////////////////////

export {
	factory
}

/////////////////////
