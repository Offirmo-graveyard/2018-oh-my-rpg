/////////////////////
import { ItemQuality } from '@oh-my-rpg/definitions'
import { Weapon } from '@oh-my-rpg/logic-weapons'
import { Armor } from '@oh-my-rpg/logic-armors'

/////////////////////

type WeaponRenderer = (w: Weapon) => string
type ArmorRenderer = (a: Armor) => string
type ItemQualityColorizer = (q: ItemQuality, s: string) => string

/////////////////////

export {
	WeaponRenderer,
	ArmorRenderer,
	ItemQualityColorizer,
}

/////////////////////
