import { Random, Engine } from '@offirmo/random'

import {
	Weapon,
	MAX_ENHANCEMENT_LEVEL,
	factory,
	generate_random_demo_weapon,
	enhance_weapon,
} from '.'

describe('⚔ 🏹  weapon logic:', function() {

	describe('creation', function() {

		it('should allow creating a random weapon', function() {
			const rng: Engine = Random.engines.mt19937().seed(789)
			const weapon1 = factory(rng)
			expect(weapon1).to.deep.equal({
				slot: 'weapon',
				base_hid: 'luth',
				qualifier1_hid: 'simple',
				qualifier2_hid: 'mercenary',
				quality: 'legendary',
				base_strength: 14,
				enhancement_level: 0
			} as Weapon)
			expect((rng as any).getUseCount()).to.equal(5)

			const weapon2 = factory(rng)
			expect((rng as any).getUseCount()).to.equal(10)
			expect(weapon2).not.to.deep.equal(weapon1)
		})

		it('should allow creating a partially predefined weapon', function() {
			const rng: Engine = Random.engines.mt19937().seed(789)
			const weapon = factory(rng, {
				base_hid: 'spoon',
				quality: 'artifact',
			})
			expect(weapon).to.deep.equal({
				slot: 'weapon',
				base_hid: 'spoon',
				qualifier1_hid: 'composite',
				qualifier2_hid: 'twink',
				quality: 'artifact',
				base_strength: 19,
				enhancement_level: 0
			} as Weapon)
			expect((rng as any).getUseCount()).to.equal(3) // 2 less random picks
		})
	})

	describe('enhancement', function() {

		it('should allow enhancing a weapon', function() {
			let weapon = generate_random_demo_weapon()
			weapon.enhancement_level = 0

			weapon = enhance_weapon(weapon)
			expect(weapon.enhancement_level, 1).to.equal(1)

			for(let i = 2; i <= MAX_ENHANCEMENT_LEVEL; ++i) {
				weapon = enhance_weapon(weapon)
				expect(weapon.enhancement_level, i).to.equal(i)
			}

			expect(weapon.enhancement_level, 'max').to.equal(MAX_ENHANCEMENT_LEVEL)
		})

		it('should fail if weapon is already at max enhancement level', () => {
			let weapon = generate_random_demo_weapon()
			weapon.enhancement_level = MAX_ENHANCEMENT_LEVEL

			function enhance() {
				weapon = enhance_weapon(weapon)
			}

			expect(enhance).to.throw('maximal enhancement level!')
		})
	})
})
