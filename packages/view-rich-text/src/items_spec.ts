import * as RichText from '@oh-my-rpg/rich-text-format'

import { InventorySlot, ItemQuality } from '@oh-my-rpg/definitions'
import { generate_random_demo_weapon, DEMO_WEAPON_1, DEMO_WEAPON_2 } from '@oh-my-rpg/logic-weapons'
import { generate_random_demo_armor, DEMO_ARMOR_1, DEMO_ARMOR_2 } from '@oh-my-rpg/logic-armors'

const { rich_text_to_ansi } = require('../../../the-npm-rpg/src/v2/utils/rich_text_to_ansi')
const prettyjson = require('prettyjson')
function prettify_json(data: any, options = {}) {
	return prettyjson.render(data, options)
}

import {
	render_weapon,
	render_armor,
	render_item,
} from '.'


describe('🔠  view to @oh-my-rpg/rich-text-format', function() {

	describe('⚔  weapon rendering', function() {

		context('when not enhanced', function() {

			it('should render properly', () => {
				const $doc = render_weapon({
					slot: InventorySlot.weapon,
					base_hid: 'luth',
					qualifier1_hid: 'simple',
					qualifier2_hid: 'mercenary',
					quality: ItemQuality.legendary,
					base_strength: 14,
					enhancement_level: 0,
				})
				const str = RichText.to_text($doc)
				expect(str).to.be.a.string
				expect(str).to.include('Luth')
				expect(str).to.include('Simple')
				expect(str).to.include('Mercenary')
				expect(str).not.to.include('+')
			})
		})

		context('when enhanced', function() {

			it('should render properly', () => {
				const $doc = render_weapon({
					slot: InventorySlot.weapon,
					base_hid: 'longsword',
					qualifier1_hid: 'onyx',
					qualifier2_hid: 'warfield_king',
					quality: ItemQuality.legendary,
					base_strength: 14,
					enhancement_level: 3,
				})
				const str = RichText.to_text($doc)
				expect(str).to.be.a.string
				expect(str).to.include('Long sword')
				expect(str).to.include('Onyx')
				expect(str).to.include('Warfield king’s')
				expect(str).to.include('+3')
			})
		})
	})

	describe('🛡  armor rendering', function() {

		context('when not enhanced', function() {

			it('should render properly', () => {
				const $doc = render_armor({
					slot: InventorySlot.armor,
					base_hid: 'socks',
					qualifier1_hid: 'onyx',
					qualifier2_hid: 'tormentor',
					quality: ItemQuality.legendary,
					base_strength: 14,
					enhancement_level: 0
				})
				const str = RichText.to_text($doc)
				expect(str).to.be.a.string
				expect(str).to.include('Socks')
				expect(str).to.include('Onyx')
				expect(str).to.include('Tormentor')
				expect(str).not.to.include('+')
			})
		})

		context('when enhanced', function() {

			it('should render properly', () => {
				const $doc = render_armor({
					slot: InventorySlot.armor,
					base_hid: 'mantle',
					qualifier1_hid: 'embroidered',
					qualifier2_hid: 'warfield_king',
					quality: ItemQuality.legendary,
					base_strength: 14,
					enhancement_level: 5
				})
				const str = RichText.to_text($doc)
				expect(str).to.be.a.string
				expect(str).to.include('Mantle')
				expect(str).to.include('Embroidered')
				expect(str).to.include('Warfield')
				expect(str).to.include('+5')
			})
		})
	})
/*
	describe('⚔ 🛡  equipment rendering', function() {

		context('when empty', function() {

			it('should render properly', () => {
				let inventory = inventory_factory()
				const str = render_equipment(inventory, {
					globalize: Globalize('en'),
					stylize: (style: string, s: string) => s
				})
				expect(str).to.be.a.string
			})
		})

		context('when not empty', function() {

			it('should render properly', () => {
				let inventory = inventory_factory()
				inventory = add_item(inventory, generate_random_demo_weapon())
				inventory = add_item(inventory, generate_random_demo_armor())
				inventory = equip_item(inventory, 0)
				inventory = equip_item(inventory, 0)

				const str = render_equipment(inventory, {
					globalize: Globalize('en'),
					stylize: (style: string, s: string) => s
				})
				expect(str).to.be.a.string
			})
		})
	})
	*/

	describe('demo', function() {

		it('shows off weapons', () => {

			const doc2 = render_weapon(DEMO_WEAPON_2)
			//console.log(prettify_json(doc2))
			console.log(rich_text_to_ansi(doc2))

			const doc1 = render_weapon(DEMO_WEAPON_1)
			//console.log(prettify_json(doc1))
			console.log(rich_text_to_ansi(doc1))

			for(let i = 0; i < 10; ++i) {
				const i = generate_random_demo_weapon()
				const doc = render_weapon(i)
				//console.log(prettify_json(doc))
				console.log(rich_text_to_ansi(doc))
			}
		})

		it('shows off armors', () => {

			const doc2 = render_armor(DEMO_ARMOR_2)
			//console.log(prettify_json(doc2))
			console.log(rich_text_to_ansi(doc2))

			const doc1 = render_armor(DEMO_ARMOR_1)
			//console.log(prettify_json(doc1))
			console.log(rich_text_to_ansi(doc1))

			for(let i = 0; i < 10; ++i) {
				const i = generate_random_demo_armor()
				const doc = render_armor(i)
				//console.log(prettify_json(doc))
				console.log(rich_text_to_ansi(doc))
			}
		})
	})
})
