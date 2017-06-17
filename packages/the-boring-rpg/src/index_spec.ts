
import {
	get_unequiped_item_count,
	get_equiped_item_count,
} from '@oh-my-rpg/state-inventory'

import {
	factory
} from '.'

describe('⚔ 👑 😪  The Boring RPG', function() {

	describe('🆕 initial state', function() {

		it('should be correct', function() {
			const state = factory()

			expect(get_equiped_item_count(state.inventory), 'e').to.equal(2)
			expect(get_unequiped_item_count(state.inventory), 'u').to.equal(0)

		})
	})
})
