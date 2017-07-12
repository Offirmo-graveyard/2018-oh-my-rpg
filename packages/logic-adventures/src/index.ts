/////////////////////

import { Random, Engine } from '@offirmo/random'

import * as static_adventure_data from '@oh-my-rpg/data/src/adventure_archetype'

import {
	CoinsGain,
	AdventureArchetype,
} from './types'

/////////////////////

const ALL_ADVENTURE_ARCHETYPES: AdventureArchetype[] = static_adventure_data.map((paa: Partial<AdventureArchetype>) => {
	const gains: Partial<AdventureArchetype['post']['gains']> = (paa.post || {} as any).gains || {}
	// type fields
	gains.level    = !!gains.level
	gains.agility  =   gains.agility  || 0
	gains.health   =   gains.health   || 0
	gains.luck     =   gains.luck     || 0
	gains.mana     =   gains.mana     || 0
	gains.strength =   gains.strength || 0
	gains.vitality =   gains.vitality || 0
	gains.wisdom   =   gains.wisdom   || 0
	gains.coins    =   gains.coins    || CoinsGain.none
	gains.tokens   =   gains.tokens   || 0
	gains.armor    = !!gains.armor
	gains.weapon   = !!gains.weapon
	gains.armor_improvement  = !!gains.armor_improvement
	gains.weapon_improvement = !!gains.weapon_improvement

	return {
		hid: paa.hid!,
		good: paa.good!,
		post: {
			gains: gains as AdventureArchetype['post']['gains']
		},
	}
})

const ALL_GOOD_ADVENTURE_ARCHETYPES: AdventureArchetype[] = ALL_ADVENTURE_ARCHETYPES.filter(aa => aa.good)
const ALL_BAD_ADVENTURE_ARCHETYPES: AdventureArchetype[] = ALL_ADVENTURE_ARCHETYPES.filter(aa => !aa.good)

const COINS_GAIN_MULTIPLIER_PER_LEVEL = 1.1

const COINS_GAIN_RANGES: { [k: string]: [number, number] } = {
	none:   [  0,    0],
	small:  [  1,   20],
	medium: [ 50,  100],
	big:    [500,  700],
	huge:   [900, 2000],
}


/////////////////////

// useful for picking an exact archetype (ex. tests)
function get_archetype(hid: string): AdventureArchetype {
	const aa = ALL_ADVENTURE_ARCHETYPES.find(aa => aa.hid === hid)
	if (!aa)
		throw new Error(`logic-adventures, get_archetype(): couldn't find archetype "${hid}" !`)
	return aa!
}

function pick_random_good_archetype(rng: Engine): AdventureArchetype {
	return Random.pick(rng, ALL_GOOD_ADVENTURE_ARCHETYPES)
}

function pick_random_bad_archetype(rng: Engine): AdventureArchetype {
	return Random.pick(rng, ALL_BAD_ADVENTURE_ARCHETYPES)
}

function generate_random_coin_gain(rng: Engine, range: CoinsGain, player_level: number): number {
	if (range === CoinsGain.none)
		return 0

	const level_multiplier = player_level * COINS_GAIN_MULTIPLIER_PER_LEVEL
	const interval = COINS_GAIN_RANGES[range]

	return Random.integer(interval[0] * level_multiplier, interval[1] * level_multiplier)(rng)
}

/////////////////////

export {
	CoinsGain,
	AdventureArchetype,

	pick_random_good_archetype,
	pick_random_bad_archetype,
	generate_random_coin_gain,
	get_archetype,
}

/////////////////////
