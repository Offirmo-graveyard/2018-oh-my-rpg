type WeaponRenderer = (w: Weapon) => string
type ArmorRenderer = (a: Armor) => string
type ItemQualityColorizer = (q: ItemQuality, s: string) => string

	WeaponRenderer,
	ArmorRenderer,
	ItemQualityColorizer,



function get_ansi_color_for_quality(quality: ItemQuality): string {
	switch (quality) {
		case ItemQuality.common:
			return 'gray'
		case ItemQuality.uncommon:
			return 'green'
		case ItemQuality.rare:
			return 'blue'
		case ItemQuality.epic:
			return 'magenta'
		case ItemQuality.legendary:
			return 'red'
		case ItemQuality.artifact:
			return 'yellow'
		default:
			throw new Error(`get_ansi_color_for_quality(): Unknown ItemQuality : ${quality}`)
	}
}

function get_html_color_for_quality(quality: ItemQuality): string {
	// TODO better colors
	switch (quality) {
		case ItemQuality.common:
			return 'gray'
		case ItemQuality.uncommon:
			return 'green'
		case ItemQuality.rare:
			return 'blue'
		case ItemQuality.epic:
			return 'magenta'
		case ItemQuality.legendary:
			return 'red'
		case ItemQuality.artifact:
			return 'yellow'
		default:
			throw new Error(`get_html_color_for_quality(): Unknown ItemQuality : ${quality}`)
	}
}

	describe('💠  item quality rendering', function() {

		describe('color for ansi console', function() {

			it('should work', () => {
				const color = get_ansi_color_for_quality(ItemQuality.legendary)
				expect(color).to.equal('red')
			})
		})

		describe('color for html', function() {

			it('should work', () => {
				const color = get_html_color_for_quality(ItemQuality.uncommon)
				expect(color).to.equal('green')
			})
		})
	})
