import { ItemQuality } from '@oh-my-rpg/definitions';
import { Weapon } from '@oh-my-rpg/logic-weapons';
import { Armor } from '@oh-my-rpg/logic-armors';
declare type WeaponRenderer = (w: Weapon) => string;
declare type ArmorRenderer = (a: Armor) => string;
declare type ItemQualityColorizer = (q: ItemQuality, s: string) => string;
export { WeaponRenderer, ArmorRenderer, ItemQualityColorizer };
