import { InventorySlot, ItemQuality } from '@oh-my-rpg/definitions'
import { generate_random_demo_weapon } from '@oh-my-rpg/logic-weapons'
import { generate_random_demo_armor } from '@oh-my-rpg/logic-armors'

import {
	State as InventoryState,
	factory as inventory_factory,
	equip_item,
	add_item,
	remove_item,
} from '@oh-my-rpg/state-inventory'

import {
	Currency,
	State as WalletState,
	factory as wallet_factory,
	add_amount,
} from '@oh-my-rpg/state-wallet'

import { Random, Engine } from '@offirmo/random'

import {
	get_ansi_color_for_quality,
	get_html_color_for_quality,
	render_weapon,
	render_armor,
	render_equipment,
	render_inventory,
	render_wallet,
} from '.'

declare const console: any // XXX

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
			})
		})
	})

	describe('⚔ 🛡  equipment rendering', function() {

		context('when empty', function() {

			it('should render properly', () => {
				let inventory = inventory_factory()
				const str = render_equipment(inventory)
				expect(str).to.be.a.string
			})
		})

		context('when not empty', function() {

			it('should render properly', () => {
				let inventory = inventory_factory()
				inventory = add_item(inventory, generate_random_demo_weapon())
				inventory = add_item(inventory, generate_random_demo_armor())
				inventory = equip_item(inventory, 0)
				inventory = equip_item(inventory, 1)

				const str = render_equipment(inventory)
				expect(str).to.be.a.string
			})
		})
	})

	describe('📦  inventory rendering', function() {

		context('when empty', function() {

			it('should render properly', () => {
				let inventory = inventory_factory()
				const str = render_inventory(inventory)
				expect(str).to.be.a.string
				expect(str).to.contain(' 1.')
				expect(str).not.to.contain(' 0.')
				expect(str).to.contain('20.')
			})
		})

		context('when not empty', function() {

			it('should render properly', () => {
				let inventory = inventory_factory()
				inventory = add_item(inventory, generate_random_demo_weapon())
				inventory = add_item(inventory, generate_random_demo_weapon())
				inventory = add_item(inventory, generate_random_demo_armor())
				inventory = add_item(inventory, generate_random_demo_weapon())
				inventory = add_item(inventory, generate_random_demo_armor())
				inventory = add_item(inventory, generate_random_demo_armor())
				inventory = remove_item(inventory, 4)

				const str = render_inventory(inventory)
				expect(str).to.be.a.string
				expect(str).to.contain(' 1.')
				expect(str).to.contain('20.')
			})
		})
	})

	describe('💰  wallet rendering', function() {

		context('when empty', function() {

			it('should render properly', () => {
				let wallet = wallet_factory()
				const str = render_wallet(wallet)
				expect(str).to.be.a.string
				expect(str).to.contain('0')
			})
		})

		context('when not empty', function() {

			it('should render properly', () => {
				let wallet = wallet_factory()

				wallet = add_amount(wallet, Currency.coin, 12)
				wallet = add_amount(wallet, Currency.token, 34)


				const str = render_wallet(wallet)
				expect(str).to.be.a.string
				expect(str).not.to.contain('0')
				expect(str).to.contain('12')
				expect(str).to.contain('34')
			})
		})
	})

})
