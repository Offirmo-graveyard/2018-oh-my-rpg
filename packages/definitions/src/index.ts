/////////////////////

import { ItemQuality, InventorySlot } from './types'

const ITEM_QUALITIES: ItemQuality[] = [
	ItemQuality.common,
	ItemQuality.uncommon,
	ItemQuality.rare,
	ItemQuality.epic,
	ItemQuality.legendary,
	ItemQuality.artifact,
]

const ITEM_SLOTS: InventorySlot[] = [
	InventorySlot.weapon,
	InventorySlot.armor,
]

/////////////////////

export * from './types'

export {
	ITEM_QUALITIES,
	ITEM_SLOTS,
}

/////////////////////
