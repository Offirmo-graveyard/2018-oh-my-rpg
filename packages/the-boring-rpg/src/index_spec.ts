
import { xxx_internal_reset_prng_cache } from '@oh-my-rpg/state-prng'

import {
	get_unequiped_item_count,
	get_equiped_item_count,
} from '@oh-my-rpg/state-inventory'

import {
	factory,
	play,
} from '.'

describe('⚔ 👑 😪  The Boring RPG', function() {
	beforeEach(() => xxx_internal_reset_prng_cache())

	describe('🆕 initial state', function() {

		it('should be correct', function() {
			const state = factory()

			expect(get_equiped_item_count(state.inventory), 'e').to.equal(2)
			expect(get_unequiped_item_count(state.inventory), 'u').to.equal(0)

		})
	})

	describe('user actions', function() {

		describe('play', function() {

			context('when the cooldown has NOT passed', function() {
				it('should generate a negative adventure')
				it('should not decrease user stats')
				it('should punish the user by increasing the cooldown')
			})

			context('when the cooldown has passed', function() {

				it('should sometime generate an adventure', () => {
					const state = play(factory())

					expect(state.last_adventure).not.to.be.null
					expect(state.last_adventure!.good).to.be.true
				})

				it('should update state according to the adventure output')

				it('should sometime generate a battle')
			})
		})

		describe('inventory management', function() {

			it('should allow equiping an item, correctly swapping with an already equiped item')
			it('should allow un-equiping an item')
			it('should allow discarding an item')
		})
	})
})
