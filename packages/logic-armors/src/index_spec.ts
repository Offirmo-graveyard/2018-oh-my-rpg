import { Random, Engine } from '@offirmo/random'

import {
	Armor,
	MAX_ENHANCEMENT_LEVEL,
	factory,
	generate_random_demo_armor,
	enhance,
} from '.'

describe('🛡 👕  armor logic:', function() {

	describe('creation', function() {

		it('should allow creating a random armor', function() {
			const rng: Engine = Random.engines.mt19937().seed(789)
			const armor1 = factory(rng)
			expect(armor1).to.deep.equal({
				slot: 'armor',
				base_hid: 'socks',
				qualifier1_hid: 'onyx',
				qualifier2_hid: 'tormentor',
				quality: 'legendary',
				base_strength: 14,
				enhancement_level: 0
			} as Armor)
			expect((rng as any).getUseCount()).to.equal(5)

			const armor2 = factory(rng)
			expect((rng as any).getUseCount()).to.equal(10)
			expect(armor2).not.to.deep.equal(armor1)
		})

		it('should allow creating a partially predefined armor', function() {
			const rng: Engine = Random.engines.mt19937().seed(789)
			const armor = factory(rng, {
				base_hid: 'shoes',
				quality: 'artifact',
			})
			expect(armor).to.deep.equal({
				slot: 'armor',
				base_hid: 'shoes',
				qualifier1_hid: 'skeleton',
				qualifier2_hid: 'training',
				quality: 'artifact',
				base_strength: 19,
				enhancement_level: 0
			} as Armor)
			expect((rng as any).getUseCount()).to.equal(3) // 2 less random picks
		})
	})

	describe('enhancement', function() {

		it('should allow enhancing a armor', function() {
			let armor = generate_random_demo_armor()
			armor.enhancement_level = 0

			armor = enhance(armor)
			expect(armor.enhancement_level, 1).to.equal(1)

			for(let i = 2; i <= MAX_ENHANCEMENT_LEVEL; ++i) {
				armor = enhance(armor)
				expect(armor.enhancement_level, i).to.equal(i)
			}

			expect(armor.enhancement_level, 'max').to.equal(MAX_ENHANCEMENT_LEVEL)
		})

		it('should fail if armor is already at max enhancement level', () => {
			let armor = generate_random_demo_armor()
			armor.enhancement_level = MAX_ENHANCEMENT_LEVEL

			function attempt_enhance() {
				armor = enhance(armor)
			}

			expect(attempt_enhance).to.throw('maximal enhancement level!')
		})
	})
})
