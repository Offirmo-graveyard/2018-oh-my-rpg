import { Engine } from '@offirmo/random';
import { CoinsGain, AdventureArchetype } from './types';
declare function pick_random_good_archetype(rng: Engine): AdventureArchetype;
declare function pick_random_bad_archetype(rng: Engine): AdventureArchetype;
declare function generate_random_coin_gain(rng: Engine, range: CoinsGain, player_level: number): number;
export { CoinsGain, AdventureArchetype, pick_random_good_archetype, pick_random_bad_archetype, generate_random_coin_gain };
