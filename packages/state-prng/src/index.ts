/////////////////////

import { Random, MT19937 } from '@offirmo/random'

import {
	State,
} from './types'

/////////////////////

const DEFAULT_SEED = 987

function factory(): State {
	return {
		seed: DEFAULT_SEED,
		use_count: 0,
	}
}

/////////////////////

function set_seed(state: State, seed: number): State {
	state.seed = seed
	state.use_count = 0

	return state
}

function update_use_count(state: State, prng: MT19937): State {
	const new_use_count = prng.getUseCount()

	if (new_use_count < state.use_count)
		throw new Error(`update PRNG state: count is lower than previous count, this is unexpected! Check your code!`)

	if (new_use_count === state.use_count)
		throw new Error(`update PRNG state: count hasn't changed! Check your code!`)

	if (prng !== cached_prng)
		throw new Error(`update PRNG state: passed prng is not the cached one, this is unexpected!`)

	state.use_count = new_use_count

	return state
}


/////////////////////

// TODO improve offirmo/random
interface MTEngineWithSeed extends MT19937 {
	_seed?: number
}

// since
// - we MUST use only one, repeatable PRNG
// - we can't store the prng in the state
// - we must configure it once at start
// we use a global cache to not recreate the prng each time.
// Still, we control that the usage conforms to those expectations.

let cached_prng: MTEngineWithSeed = ('foo' as any as MTEngineWithSeed)
let updated = false
xxx_internal_reset_prng_cache()

// XXX this method has expectations ! (see above)
function get_prng(state: Readonly<State>): MT19937 {
	let update_made = false

	if (cached_prng._seed !== state.seed) {
		cached_prng.seed(state.seed)
		update_made = true
	}

	if (cached_prng.getUseCount() !== state.use_count) {

		// should never happen
		if (cached_prng.getUseCount() !== 0)
			throw new Error(`state-prng get_prng() unexpected case with current cached implementation: need to update a partially used prng!`)

		cached_prng.discard(state.use_count)
		update_made = true
	}

	if (update_made) {
		// should never happen if we correctly update the prng state after each use
		if (updated)
			throw new Error(`state-prng unexpected case: need to update again the prng!`)
		updated = true
	}

	return cached_prng
}

function xxx_internal_reset_prng_cache() {
	cached_prng = Random.engines.mt19937().seed(DEFAULT_SEED)
	cached_prng._seed = DEFAULT_SEED
	updated = false
}

/*
function get_prng(state: State, callback: (prng: Engine) => Promise<void>): void {
	return state.slotted[slot] || null
}
*/


/////////////////////

export {
	State,
	DEFAULT_SEED,
	factory,

	set_seed,
	update_use_count,

	get_prng,

	// exposed for testability, do not use !
	xxx_internal_reset_prng_cache,
}

/////////////////////
