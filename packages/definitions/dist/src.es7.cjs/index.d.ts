import { ItemQuality, InventorySlot } from './types';
declare const ITEM_QUALITIES: ItemQuality[];
declare const ITEM_SLOTS: InventorySlot[];
declare const MIN_LEVEL = 1;
declare const MAX_LEVEL = 9999;
export * from './types';
export { ITEM_QUALITIES, ITEM_SLOTS, MIN_LEVEL, MAX_LEVEL };
