type WeaponRenderer = (w: Weapon) => string
type ArmorRenderer = (a: Armor) => string
type ItemQualityColorizer = (q: ItemQuality, s: string) => string

	WeaponRenderer,
	ArmorRenderer,
	ItemQualityColorizer,
