import { Enum } from 'typescript-string-enums'

/////////////////////

const ItemQuality = Enum(
	'common',
	'uncommon',
	'rare',
	'epic',
	'legendary',
	'artifact',
)
type ItemQuality = Enum<typeof ItemQuality>

///////

const InventorySlot = Enum(
	'none',
	'weapon',
	'armor',
)
type InventorySlot = Enum<typeof InventorySlot>

///////

interface Item {
	slot: InventorySlot
	quality: ItemQuality
}

///////

// TODO
type ReportUp = (event: string, options: Object) => boolean

/////////////////////

export {
	ItemQuality,
	InventorySlot,
	Item,
	ReportUp,
}

/////////////////////
