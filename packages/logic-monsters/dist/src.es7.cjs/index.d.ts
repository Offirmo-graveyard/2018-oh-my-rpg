import { Engine } from '@offirmo/random';
import { Monster, MonsterRank } from './types';
declare function factory(rng: Engine, hints?: Partial<Monster>): Monster;
declare function generate_random_demo_monster(): Monster;
export { MonsterRank, Monster, factory, generate_random_demo_monster };
