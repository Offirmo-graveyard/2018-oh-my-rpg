import { CharacterClass } from '@oh-my-rpg/state-character';
import { InventoryCoordinates } from '@oh-my-rpg/state-inventory';
import { State, GainType, Adventure } from './types';
declare function create(): State;
declare function appraise_item_at_coordinates(state: Readonly<State>, coordinates: InventoryCoordinates): number;
declare function reseed(state: State, seed?: number): State;
declare function play(state: State, explicit_adventure_archetype_hid?: string): State;
declare function equip_item(state: State, coordinates: InventoryCoordinates): State;
declare function sell_item(state: State, coordinates: InventoryCoordinates): State;
declare function rename_avatar(state: State, new_name: string): State;
declare function change_avatar_class(state: State, klass: CharacterClass): State;
declare const DEMO_ADVENTURE_01: Adventure;
declare const DEMO_ADVENTURE_02: Adventure;
declare const DEMO_STATE: State;
declare const OLDEST_LEGACY_STATE_FOR_TESTS: any;
declare const MIGRATION_HINTS_FOR_TESTS: any;
export { GainType, Adventure, State, appraise_item_at_coordinates, create, reseed, play, equip_item, sell_item, rename_avatar, change_avatar_class, DEMO_ADVENTURE_01, DEMO_ADVENTURE_02, DEMO_STATE, OLDEST_LEGACY_STATE_FOR_TESTS, MIGRATION_HINTS_FOR_TESTS };
