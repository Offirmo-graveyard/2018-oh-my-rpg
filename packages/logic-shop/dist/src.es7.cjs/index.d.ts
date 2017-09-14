import { Engine } from '@offirmo/random';
import { Item } from '@oh-my-rpg/definitions';
declare function factory(rng: Engine): void;
declare function appraise(item: Item): number;
export { factory, appraise };
