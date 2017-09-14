import { Random, Engine } from '@offirmo/random'

/////////////////////

import {
	InventorySlot,
	ItemQuality,
	Item,
} from '@oh-my-rpg/definitions'

import {
	State as MetaState,
	factory as meta_state_factory,
} from '@oh-my-rpg/state-meta'

import {
	CharacterStat,
	CharacterClass,
	State as CharacterState,
	factory as character_state_factory,
	increase_stat,
	rename,
	switch_class,
} from '@oh-my-rpg/state-character'

import {
	State as WalletState,
	Currency,
	factory as wallet_state_factory,
	add_amount as wallet_add_amount,
	remove_amount as wallet_remove_amount,
} from '@oh-my-rpg/state-wallet'

import {
	State as InventoryState,
	InventoryCoordinates,
	factory as inventory_state_factory,
	add_item as inventory_add_item,
	equip_item as inventory_equip_item,
	remove_item as inventory_remove_item,
	get_item_in_slot,
	get_item_at_coordinates,
} from '@oh-my-rpg/state-inventory'

import {
	factory as prng_state_factory,
	set_seed as prng_set_seed,
	update_use_count as prng_update_use_count,
	get_prng,
} from '@oh-my-rpg/state-prng'

import {
	Weapon,
	factory as weapon_factory,
	enhance as enhance_weapon,
	MAX_ENHANCEMENT_LEVEL as MAX_WEAPON_ENHANCEMENT_LEVEL,
} from '@oh-my-rpg/logic-weapons'

import {
	Armor,
	factory as armor_factory,
	enhance as enhance_armor,
	MAX_ENHANCEMENT_LEVEL as MAX_ARMOR_ENHANCEMENT_LEVEL,
} from '@oh-my-rpg/logic-armors'

import {
	appraise,
} from '@oh-my-rpg/logic-shop'

import {
	CoinsGain,
	AdventureArchetype,

	get_archetype,
	pick_random_good_archetype,
	pick_random_bad_archetype,
	generate_random_coin_gain,
} from '@oh-my-rpg/logic-adventures'

import {
	VERSION,
	State,
	GainType,
	Adventure,
} from './types'

/////////////////////

function factory(): State {
	let state: State = {
		version: VERSION,
		meta: meta_state_factory(),
		avatar: character_state_factory(),
		inventory: inventory_state_factory(),
		wallet: wallet_state_factory(),
		prng: prng_state_factory(),

		last_adventure: null,
		click_count: 0,
		good_click_count: 0,
		meaningful_interaction_count: 0,
	}

	let rng = get_prng(state.prng)

	const start_weapon = weapon_factory(rng, {
		base_hid: 'spoon',
		qualifier1_hid: 'used',
		qualifier2_hid: 'noob',
		quality: ItemQuality.common,
		base_strength: 1,
	})
	state = receive_item(state, start_weapon)
	state = equip_item(state, 0)

	const start_armor = armor_factory(rng, {
		base_hid: 'socks',
		qualifier1_hid: 'used',
		qualifier2_hid: 'noob',
		quality: 'common',
		base_strength: 1,
	})
	state = receive_item(state, start_armor)
	state = equip_item(state, 0)

	//state.prng = prng_update_use_count(state.prng, rng)

	return state
}

function migrate_to_latest(state: any): State {
	const src_version = state.version

	if (!state.version) {
		// new game
		return factory()
	}

	if (src_version === VERSION)
		return state as State

	if (src_version > VERSION)
		throw new Error('You saved game was is from a more recent version of this game. Please update!')

	console.warn(`migrating data from v${src_version} to ${VERSION}...`)

	// TODO migrate properly when out of beta
	console.error(`beta: migrating through full reset !`)
	return factory()
}

/////////////////////

function instantiate_adventure_archetype(rng: Engine, aa: AdventureArchetype, player_level: number, inventory: InventoryState): Adventure {
	let {hid, good, post: { gains : {
		level: should_gain_a_level,
		agility,
		health,
		luck,
		mana,
		strength,
		charisma,
		wisdom,
		coins: coins_gain,
		tokens,
		armor: should_receive_armor,
		weapon: should_receive_weapon,
		armor_or_weapon: should_receive_armor_or_weapon,
		armor_improvement,
		weapon_improvement,
		armor_or_weapon_improvement,
	}}} = aa

	// instantiate the random gains
	// TODO take into account the inventory
	if (should_receive_armor_or_weapon) {
		if (Random.bool()(rng))
			should_receive_armor = true
		else
			should_receive_weapon = true
	}
	if (armor_or_weapon_improvement) {
		if (Random.bool()(rng))
			armor_improvement = true
		else
			weapon_improvement = true
	}

	const new_player_level = player_level + (should_gain_a_level ? 1 : 0)
	const weapon = should_receive_weapon
		? weapon_factory(rng)
		: null
	const armor = should_receive_armor
		? armor_factory(rng)
		: null

	return {
		hid,
		good,
		gains: {
			level: should_gain_a_level ? 1 : 0,
			health,
			mana,
			strength,
			agility,
			charisma,
			wisdom,
			luck,
			coins: generate_random_coin_gain(rng, coins_gain, new_player_level),
			tokens,
			weapon,
			armor,
			armor_improvement,
			weapon_improvement,
		}
	}
}

function receive_stat_increase(state: State, stat: CharacterStat, amount = 1): State {
	state.avatar = increase_stat(state.avatar, stat, amount)
	return state
}

function receive_item(state: State, item: Item): State {
	// TODO handle inventory full
	state.inventory = inventory_add_item(state.inventory, item)
	return state
}

function receive_coins(state: State, amount: number): State {
	state.wallet = wallet_add_amount(state.wallet, Currency.coin, amount)
	return state
}

function receive_tokens(state: State, amount: number): State {
	state.wallet = wallet_add_amount(state.wallet, Currency.token, amount)
	return state
}

function play_good(state: State, explicit_adventure_archetype_hid?: string): State {
	state.good_click_count++
	state.meaningful_interaction_count++;

	let rng = get_prng(state.prng)

	const aa: AdventureArchetype = explicit_adventure_archetype_hid
		? get_archetype(explicit_adventure_archetype_hid)
		: pick_random_good_archetype(rng)
	const adventure = instantiate_adventure_archetype(
		rng,
		aa,
		state.avatar.characteristics.level,
		state.inventory,
	)
	state.last_adventure = adventure

	const {gains : {
		level,
		health,
		mana,
		strength,
		agility,
		charisma,
		wisdom,
		luck,
		coins,
		tokens,
		armor,
		weapon,
		armor_improvement,
		weapon_improvement,
	}} = adventure

	// TODO store hid for no repetition

	let gain_count = 0
	if (level) {
		gain_count++
		state = receive_stat_increase(state, CharacterStat.level)
	}
	if (health) {
		gain_count++
		state = receive_stat_increase(state, CharacterStat.health, health)
	}
	if (mana) {
		gain_count++
		state = receive_stat_increase(state, CharacterStat.mana, mana)
	}
	if (strength) {
		gain_count++
		state = receive_stat_increase(state, CharacterStat.strength, strength)
	}
	if (agility) {
		gain_count++
		state = receive_stat_increase(state, CharacterStat.agility, agility)
	}
	if (charisma) {
		gain_count++
		state = receive_stat_increase(state, CharacterStat.charisma, charisma)
	}
	if (wisdom) {
		gain_count++
		state = receive_stat_increase(state, CharacterStat.wisdom, wisdom)
	}
	if (luck) {
		gain_count++
		state = receive_stat_increase(state, CharacterStat.luck, luck)
	}

	if (coins) {
		gain_count++
		state = receive_coins(state, coins)
	}
	if (tokens) {
		gain_count++
		state = receive_tokens(state, tokens)
	}

	if (weapon) {
		gain_count++
		state = receive_item(state, weapon)
	}
	if (armor) {
		gain_count++
		state = receive_item(state, armor)
	}

	if (weapon_improvement) {
		gain_count++
		let weapon_to_enhance = get_item_in_slot(state.inventory, InventorySlot.weapon) as Weapon
		if (weapon_to_enhance && weapon_to_enhance.enhancement_level < MAX_WEAPON_ENHANCEMENT_LEVEL)
			enhance_weapon(weapon_to_enhance)
		// TODO enhance another weapon as fallback
	}

	if (armor_improvement) {
		gain_count++
		const armor_to_enhance = get_item_in_slot(state.inventory, InventorySlot.armor) as Armor
		if (armor_to_enhance && armor_to_enhance.enhancement_level < MAX_ARMOR_ENHANCEMENT_LEVEL)
			enhance_armor(armor_to_enhance)
		// TODO enhance another armor as fallback
	}

	state.prng = prng_update_use_count(state.prng, rng)

	return state
}

function appraise_item_at_coordinates(state: Readonly<State>, coordinates: InventoryCoordinates): number {
	const item_to_sell = get_item_at_coordinates(state.inventory, coordinates)
	if (!item_to_sell)
		throw new Error('Sell: No item!')

	return appraise(item_to_sell)
}
/////////////////////

// allow passing an explicit adventure archetype for testing !
function play(state: State, explicit_adventure_archetype_hid?: string): State {
	state.click_count++

	// TODO good / bad
	return play_good(state, explicit_adventure_archetype_hid)
}

function equip_item(state: State, coordinates: InventoryCoordinates): State {
	// TODO count it as a meaningful interaction if positive (or with a limit)
	state.inventory = inventory_equip_item(state.inventory, coordinates)
	return state
}

function sell_item(state: State, coordinates: InventoryCoordinates): State {
	const price = appraise_item_at_coordinates(state, coordinates)

	state.inventory = inventory_remove_item(state.inventory, coordinates)
	state.wallet = wallet_add_amount(state.wallet, Currency.coin, price)

	// TODO count it as a meaningful interaction if positive (or with a limit)
	return state
}

function rename_avatar(state: State, new_name: string): State {
	// TODO count it as a meaningful interaction once
	state.avatar = rename(state.avatar, new_name)
	return state
}

function change_avatar_class(state: State, klass: CharacterClass): State {
	// TODO make this have an effect (in v2 ?)
	state.avatar = switch_class(state.avatar, klass)
	return state
}

/////////////////////

export {
	VERSION,
	GainType,
	Adventure,
	State,
	factory,
	migrate_to_latest,
	play,
	equip_item,
	sell_item,
	rename_avatar,
	change_avatar_class,
	appraise_item_at_coordinates,
}

/////////////////////
