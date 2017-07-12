
import { xxx_internal_reset_prng_cache } from '@oh-my-rpg/state-prng'

import {
	get_unequiped_item_count,
	get_equiped_item_count,
	get_item_at_coordinates,
} from '@oh-my-rpg/state-inventory'

import {
	Currency,
	get_currency_amount,
} from '@oh-my-rpg/state-wallet'

import {
	factory,
	play,
} from '.'

describe('⚔ 👑 😪  The Boring RPG', function() {
	beforeEach(() => xxx_internal_reset_prng_cache())

	describe('🆕 initial state', function() {

		it('should be correct', function() {
			const state = factory()

			// check our 2 predefined items are present and equipped
			expect(get_equiped_item_count(state.inventory), 'equipped').to.equal(2)
			expect(get_unequiped_item_count(state.inventory), 'unequipped').to.equal(0)
		})
	})

	describe('👆🏾 user actions', function() {

		describe('🤘🏽 play', function() {

			context('🚫 when the cooldown has NOT passed', function() {
				it('should generate a negative adventure')
				it('should not decrease user stats')
				it('should punish the user by increasing the cooldown')
				it('may actually result in a good outcome (idea)')
			})

			context('✅ when the cooldown has passed', function() {

				it('should sometime generate a story adventure', () => {
					const state = play(factory())

					expect(state.last_adventure).not.to.be.null
					expect(state.last_adventure!.good).to.be.true
				})

				it('should sometime generate a battle adventure')

				context('when the adventure is a story', function() {

					describe('the outcome', function() {

						it('should sometime be a coin gain', () => {
							let state = factory()
							state = play(state, 'dying_man')

							// we got money
							expect(get_currency_amount(state.wallet, Currency.coin)).to.be.above(0)
						})

						it('should sometime be a token gain')
						it('should sometime be a stat gain')
						it('should sometime be an item gain', () => {
							let state = factory()
							state = play(state, 'rare_goods_seller')

							// check our 2 predefined items are still present and equipped
							expect(get_equiped_item_count(state.inventory), 'equipped').to.equal(2)
							// a new item is present
							expect(get_unequiped_item_count(state.inventory), 'unequipped').to.equal(1)
							// it's a weapon !
							expect(get_item_at_coordinates(state.inventory, 0)).to.have.property('slot', 'weapon')
						})
						it('should sometime be an item improvement')
					})
				})

				context('when the adventure is a battle', function() {

					describe('the outcome', function() {

						it('should sometime be a victory')
						it('should sometime be a defeat')
					})
				})
			})
		})

		describe('inventory management', function() {

			it('should allow un-equiping an item') // not now, but useful for ex. for immediately buying a better item on the market

			it('should allow equiping an item, correctly swapping with an already equiped item')

			it('should allow selling an item')
		})
	})
})
