/////////////////////
import { ItemQuality, InventorySlot } from '@oh-my-rpg/definitions'
import { Weapon, get_damage_interval as get_weapon_damage_interval } from '@oh-my-rpg/logic-weapons'
import { Armor, get_damage_reduction_interval as get_armor_damage_reduction_interval } from '@oh-my-rpg/logic-armors'

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
