import { Enum } from 'typescript-string-enums'

/////////////////////

interface I18nMessages {
	[k: string]: string | I18nMessages
}

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
	I18nMessages,
	ItemQuality,
	InventorySlot,
	Item,
	ReportUp,
}

/////////////////////
