/////////////////////

import { Random, Engine } from '@offirmo/random'
import { ItemQuality, InventorySlot } from '@oh-my-rpg/definitions'

import * as static_armor_data from '@oh-my-rpg/data/src/armor_component'

import {
	ArmorPartType,
	Armor,
} from './types'

const ARMOR_BASES: {type: 'base', hid: string}[] =
	static_armor_data.filter((armor_component: any) => armor_component.type === ArmorPartType.base)
const ARMOR_QUALIFIERS1: {type: 'qualifier1', hid: string}[] =
	static_armor_data.filter((armor_component: any) => armor_component.type === ArmorPartType.qualifier1)
const ARMOR_QUALIFIERS2: {type: 'qualifier2', hid: string}[] =
	static_armor_data.filter((armor_component: any) => armor_component.type === ArmorPartType.qualifier2)

const MAX_ENHANCEMENT_LEVEL = 8
const MIN_STRENGTH = 1
const MAX_STRENGTH = 20

/////////////////////

function pick_random_quality(rng: Engine): ItemQuality {
	// TODO make high qualities rarer
	return Random.pick(rng, [
		ItemQuality.common,
		ItemQuality.uncommon,
		ItemQuality.rare,
		ItemQuality.epic,
		ItemQuality.legendary,
		ItemQuality.artifact,
	])
}

function pick_random_base(rng: Engine): string {
	return Random.pick(rng, ARMOR_BASES).hid
}
function pick_random_qualifier1(rng: Engine): string {
	return Random.pick(rng, ARMOR_QUALIFIERS1).hid
}
function pick_random_qualifier2(rng: Engine): string {
	return Random.pick(rng, ARMOR_QUALIFIERS2).hid
}
const pick_random_base_strength = Random.integer(MIN_STRENGTH, MAX_STRENGTH)

/////////////////////

function factory(rng: Engine, hints: Partial<Armor> = {}): Armor {
	// TODO add a check for hints to be in existing components
	return {
		slot: InventorySlot.armor,
		base_hid: hints.base_hid || pick_random_base(rng),
		qualifier1_hid: hints.qualifier1_hid || pick_random_qualifier1(rng),
		qualifier2_hid: hints.qualifier2_hid || pick_random_qualifier2(rng),
		quality: hints.quality || pick_random_quality(rng),
		base_strength: hints.base_strength || pick_random_base_strength(rng),
		enhancement_level: hints.enhancement_level || 0,
	}
}

/////////////////////

// for demo purpose, all characteristics having the same probability + also random enhancement level
function generate_random_demo_armor(): Armor {
	const rng: Engine = Random.engines.mt19937().autoSeed()
	return factory(rng, {
		enhancement_level: Random.integer(0, MAX_ENHANCEMENT_LEVEL)(rng)
	})
}

/////////////////////

function enhance(armor: Armor): Armor {
	if (armor.enhancement_level >= MAX_ENHANCEMENT_LEVEL)
		throw new Error(`can't enhance an armor above the maximal enhancement level!`)

	armor.enhancement_level++
	return armor
}

/////////////////////

export {
	ArmorPartType,
	Armor,
	MAX_ENHANCEMENT_LEVEL,
	MIN_STRENGTH,
	MAX_STRENGTH,
	factory,
	generate_random_demo_armor,
	enhance,
}

/////////////////////
