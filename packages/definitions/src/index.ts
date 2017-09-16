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

const MIN_LEVEL = 1
const MAX_LEVEL = 9999

/////////////////////

export * from './types'

export {
	ITEM_QUALITIES,
	ITEM_SLOTS,
	MIN_LEVEL,
	MAX_LEVEL,
}

/////////////////////
