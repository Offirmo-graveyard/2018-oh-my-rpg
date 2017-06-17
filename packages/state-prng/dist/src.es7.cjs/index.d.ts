import { MT19937 } from '@offirmo/random';
import { State } from './types';
declare const DEFAULT_SEED = 987;
declare function factory(): State;
declare function set_seed(state: State, seed: number): State;
declare function update_use_count(state: State, prng: MT19937): State;
declare function get_prng(state: Readonly<State>): MT19937;
declare function xxx_internal_reset_prng_cache(): void;
export { State, DEFAULT_SEED, factory, set_seed, update_use_count, get_prng, xxx_internal_reset_prng_cache };
