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
	Characteristics,
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
	factory as monster_factory,
} from '@oh-my-rpg/logic-monsters'

import {
	appraise,
} from '@oh-my-rpg/logic-shop'

import {
	CoinsGain,
	OutcomeArchetype,
	AdventureType,
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

const STATS = [ 'health', 'mana', 'strength', 'agility', 'charisma', 'wisdom', 'luck' ]
function instantiate_adventure_archetype(rng: Engine, aa: AdventureArchetype, character: Characteristics, inventory: InventoryState): Adventure {
	let {hid, good, type, outcome : should_gain} = aa

	should_gain = {...should_gain}

	// instantiate the special gains
	if (should_gain.random_charac) {
		const stat: keyof OutcomeArchetype = Random.pick(rng, STATS) as keyof OutcomeArchetype
		should_gain[stat] = true
	}
	if (should_gain.lowest_charac) {
		const lowest_stat: keyof OutcomeArchetype = STATS.reduce((acc, val) => {
			return (character as any)[acc] < (character as any)[val] ? acc : val
		}, 'health') as keyof OutcomeArchetype
		should_gain[lowest_stat] = true
	}

	if (should_gain.armor_or_weapon) {
		// TODO take into account the existing inventory
		if (Random.bool()(rng))
			should_gain.armor = true
		else
			should_gain.weapon = true
	}
	if (should_gain.armor_or_weapon_improvement) {
		if (Random.bool()(rng))
			should_gain.armor_improvement = true
		else
			should_gain.weapon_improvement = true
	}

	// intermediate data
	const new_player_level = character.level + (should_gain.level ? 1 : 0)

	// TODO check multiple charac gain (should not happen)
	return {
		hid,
		good,
		encounter: type === AdventureType.fight ? monster_factory(rng, {level: character.level}) : undefined,
		gains: {
			level:    should_gain.level    ? 1 : 0,
			health:   should_gain.health   ? 1 : 0,
			mana:     should_gain.mana     ? 1 : 0,
			strength: should_gain.strength ? 1 : 0,
			agility:  should_gain.agility  ? 1 : 0,
			charisma: should_gain.charisma ? 1 : 0,
			wisdom:   should_gain.wisdom   ? 1 : 0,
			luck:     should_gain.luck     ? 1 : 0,
			coins:    generate_random_coin_gain(rng, should_gain.coins, new_player_level),
			tokens:   should_gain.tokens   ? 1 : 0,
			armor:    should_gain.armor    ? armor_factory(rng) : null,
			weapon:   should_gain.weapon   ? weapon_factory(rng) : null,
			armor_improvement:  should_gain.armor_improvement,
			weapon_improvement: should_gain.weapon_improvement,
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

	if (!aa)
		throw new Error(`play_good(): hinted adventure archetype "${explicit_adventure_archetype_hid}" could not be found!`)

	const adventure = instantiate_adventure_archetype(
		rng,
		aa,
		state.avatar.characteristics,
		state.inventory,
	)
	state.last_adventure = adventure

	const {gains : gained} = adventure

	// TODO store hid for no repetition

	let gain_count = 0
	if (gained.level) {
		gain_count++
		state = receive_stat_increase(state, CharacterStat.level)
	}
	if (gained.health) {
		gain_count++
		state = receive_stat_increase(state, CharacterStat.health, gained.health)
	}
	if (gained.mana) {
		gain_count++
		state = receive_stat_increase(state, CharacterStat.mana, gained.mana)
	}
	if (gained.strength) {
		gain_count++
		state = receive_stat_increase(state, CharacterStat.strength, gained.strength)
	}
	if (gained.agility) {
		gain_count++
		state = receive_stat_increase(state, CharacterStat.agility, gained.agility)
	}
	if (gained.charisma) {
		gain_count++
		state = receive_stat_increase(state, CharacterStat.charisma, gained.charisma)
	}
	if (gained.wisdom) {
		gain_count++
		state = receive_stat_increase(state, CharacterStat.wisdom, gained.wisdom)
	}
	if (gained.luck) {
		gain_count++
		state = receive_stat_increase(state, CharacterStat.luck, gained.luck)
	}

	if (gained.coins) {
		gain_count++
		state = receive_coins(state, gained.coins)
	}
	if (gained.tokens) {
		gain_count++
		state = receive_tokens(state, gained.tokens)
	}

	if (gained.weapon) {
		gain_count++
		state = receive_item(state, gained.weapon)
	}
	if (gained.armor) {
		gain_count++
		state = receive_item(state, gained.armor)
	}

	if (gained.weapon_improvement) {
		gain_count++
		let weapon_to_enhance = get_item_in_slot(state.inventory, InventorySlot.weapon) as Weapon
		if (weapon_to_enhance && weapon_to_enhance.enhancement_level < MAX_WEAPON_ENHANCEMENT_LEVEL)
			enhance_weapon(weapon_to_enhance)
		// TODO enhance another weapon as fallback
	}

	if (gained.armor_improvement) {
		gain_count++
		const armor_to_enhance = get_item_in_slot(state.inventory, InventorySlot.armor) as Armor
		if (armor_to_enhance && armor_to_enhance.enhancement_level < MAX_ARMOR_ENHANCEMENT_LEVEL)
			enhance_armor(armor_to_enhance)
		// TODO enhance another armor as fallback
	}

	if (!gain_count)
		throw new Error(`play_good() for hid "${aa.hid}" unexpectedly resulted in NO gains!`)
	state.prng = prng_update_use_count(state.prng, rng, {
		I_swear_I_really_cant_know_whether_the_rng_was_used: !!explicit_adventure_archetype_hid
	})

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
