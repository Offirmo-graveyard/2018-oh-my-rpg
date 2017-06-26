import { InventorySlot, ItemQuality } from '@oh-my-rpg/definitions'

import { Random, Engine } from '@offirmo/random'

import {
	get_ansi_color_for_quality,
	get_html_color_for_quality,
	render_weapon,
	render_armor,
} from '.'

describe('🔠  view to text', function() {

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

	describe('⚔  weapon rendering', function() {

		context('when not enhanced', function() {

			it('should render properly', () => {
				const str = render_weapon({
					slot: InventorySlot.weapon,
					base_hid: 'luth',
					qualifier1_hid: 'simple',
					qualifier2_hid: 'mercenary',
					quality: ItemQuality.legendary,
					base_strength: 14,
					enhancement_level: 0,
				})
				expect(str).to.be.a.string
				expect(str).to.include('luth')
				expect(str).to.include('simple')
				expect(str).to.include('mercenary')
				expect(str).not.to.include('+')

				console.log(str)
			})
		})

		context('when enhanced', function() {

			it('should render properly', () => {
				const str = render_weapon({
					slot: InventorySlot.weapon,
					base_hid: 'longsword',
					qualifier1_hid: 'onyx',
					qualifier2_hid: 'warfield_king',
					quality: ItemQuality.legendary,
					base_strength: 14,
					enhancement_level: 3,
				})
				expect(str).to.be.a.string
				expect(str).to.include('longsword')
				expect(str).to.include('onyx')
				expect(str).to.include('warfield_king')
				expect(str).to.include('+3')

				console.log(str)
			})
		})
	})

	describe('🛡  armor rendering', function() {

		context('when not enhanced', function() {

			it('should render properly', () => {
				const str = render_armor({
					slot: InventorySlot.armor,
					base_hid: 'socks',
					qualifier1_hid: 'onyx',
					qualifier2_hid: 'tormentor',
					quality: ItemQuality.legendary,
					base_strength: 14,
					enhancement_level: 0
				})
				expect(str).to.be.a.string
				expect(str).to.include('socks')
				expect(str).to.include('onyx')
				expect(str).to.include('tormentor')
				expect(str).not.to.include('+')

				console.log(str)
			})
		})

		context('when enhanced', function() {

			it('should render properly', () => {
				const str = render_armor({
					slot: InventorySlot.armor,
					base_hid: 'mantle',
					qualifier1_hid: 'embroidered',
					qualifier2_hid: 'warfield_king',
					quality: ItemQuality.legendary,
					base_strength: 14,
					enhancement_level: 5
				})
				expect(str).to.be.a.string
				expect(str).to.include('mantle')
				expect(str).to.include('embroidered')
				expect(str).to.include('warfield_king')
				expect(str).to.include('+5')

				console.log(str)
			})
		})
	})

})
