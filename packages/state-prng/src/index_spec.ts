import { Random, Engine } from '@offirmo/random'

import {
	DEFAULT_SEED,
	factory,

	set_seed,
	update_use_count,

	get_prng,

	xxx_internal_reset_prng_cache,
} from '.'

describe('🎲  Persistable PRNG state', function() {
	beforeEach(xxx_internal_reset_prng_cache)

	describe('🆕  initial value', function() {

		it('should have correct defaults', function() {
			const state = factory()
			expect(state.use_count).to.equal(0)
			expect(state.seed).to.equal(DEFAULT_SEED)
		})
	})

	describe('🌰  set seed', function() {

		it('should work and reset use count')
	})

	describe('update after use', function() {

		it('should correctly persist prng state', function() {
			let state = factory()

			let prng = get_prng(state)
			expect(Random.integer(0, 10)(prng), 'random 1').to.equal(2)
			expect(Random.integer(0, 10)(prng), 'random 2').to.equal(5)

			state = update_use_count(state, prng)
			expect(state.use_count).to.equal(2)
		})
	})

	describe('get_prng', function() {

		it('should return a working PRNG engine', function() {
			const state = factory()

			const prng = get_prng(state)

			expect(Random.integer(0, 10)(prng), 'random 1').to.equal(2)
			expect(Random.integer(0, 10)(prng), 'random 2').to.equal(5)
			expect(Random.integer(0, 10)(prng), 'random 3').to.equal(7)
			expect(Random.integer(0, 10)(prng), 'random 4').to.equal(0)
			expect(Random.integer(0, 10)(prng), 'random 5').to.equal(0)
			expect(Random.integer(0, 10)(prng), 'random 6').to.equal(3)
			expect(Random.integer(0, 10)(prng), 'random 7').to.equal(6)
			expect(Random.integer(0, 10)(prng), 'random 8').to.equal(10)
		})

		it('should return a repeatable PRNG engine', function() {
			let state = factory()

			let prng = get_prng(state)
			expect(Random.integer(0, 10)(prng), 'random 1').to.equal(2)
			expect(Random.integer(0, 10)(prng), 'random 2').to.equal(5)
			state = update_use_count(state, prng)
			expect(Random.integer(0, 10)(prng), 'random 3a').to.equal(7)
			expect(Random.integer(0, 10)(prng), 'random 4a').to.equal(0)

			xxx_internal_reset_prng_cache()
			prng = get_prng(state)
			expect(Random.integer(0, 10)(prng), 'random 3b').to.equal(7)
			expect(Random.integer(0, 10)(prng), 'random 4b').to.equal(0)
		})
	})
})
