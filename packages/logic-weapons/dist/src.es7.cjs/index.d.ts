import { Engine } from '@offirmo/random';
import { WeaponPartType, Weapon } from './types';
declare const MAX_ENHANCEMENT_LEVEL = 8;
declare const MIN_STRENGTH = 1;
declare const MAX_STRENGTH = 20;
declare function factory(rng: Engine, hints?: Partial<Weapon>): Weapon;
declare function generate_random_demo_weapon(): Weapon;
declare function enhance_weapon(weapon: Weapon): Weapon;
export { WeaponPartType, Weapon, MAX_ENHANCEMENT_LEVEL, MIN_STRENGTH, MAX_STRENGTH, factory, generate_random_demo_weapon, enhance_weapon };
