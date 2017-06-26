import { InventorySlot, ItemQuality } from '@oh-my-rpg/definitions'

import { Random, Engine } from '@offirmo/random'

import {
	Weapon,
	MAX_ENHANCEMENT_LEVEL,
	factory,
	generate_random_demo_weapon,
	enhance,
	get_damage_interval,
	get_medium_damage,
} from '.'

describe('⚔ 🏹  weapon logic:', function() {

	describe('creation', function() {

		it('should allow creating a random weapon', function() {
			const rng: Engine = Random.engines.mt19937().seed(789)
			const weapon1 = factory(rng)
			expect(weapon1).to.deep.equal({
				slot: InventorySlot.weapon,
				base_hid: 'luth',
				qualifier1_hid: 'simple',
				qualifier2_hid: 'mercenary',
				quality: ItemQuality.legendary,
				base_strength: 14,
				enhancement_level: 0
			})
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
				slot: InventorySlot.weapon,
				base_hid: 'spoon',
				qualifier1_hid: 'composite',
				qualifier2_hid: 'twink',
				quality: ItemQuality.artifact,
				base_strength: 19,
				enhancement_level: 0
			})
			expect((rng as any).getUseCount()).to.equal(3) // 2 less random picks
		})
	})

	describe('enhancement', function() {

		it('should allow enhancing a weapon', function() {
			let weapon = generate_random_demo_weapon()
			weapon.enhancement_level = 0

			weapon = enhance(weapon)
			expect(weapon.enhancement_level, 1).to.equal(1)

			for(let i = 2; i <= MAX_ENHANCEMENT_LEVEL; ++i) {
				weapon = enhance(weapon)
				expect(weapon.enhancement_level, i).to.equal(i)
			}

			expect(weapon.enhancement_level, 'max').to.equal(MAX_ENHANCEMENT_LEVEL)
		})

		it('should fail if weapon is already at max enhancement level', () => {
			let weapon = generate_random_demo_weapon()
			weapon.enhancement_level = MAX_ENHANCEMENT_LEVEL

			function attempt_enhance() {
				weapon = enhance(weapon)
			}

			expect(attempt_enhance).to.throw('maximal enhancement level!')
		})
	})

	describe('damage', function() {

		describe('interval', function() {

			it('should work', () => {
				const [min, max] = get_damage_interval({
					slot: InventorySlot.weapon,
					base_hid: 'luth',
					qualifier1_hid: 'simple',
					qualifier2_hid: 'mercenary',
					quality: 'legendary',
					base_strength: 14,
					enhancement_level: 3,
				})
				expect(min).to.be.a.number
				expect(max).to.be.a.number
				expect(max).to.be.above(min)

				expect(min).to.be.above(291) // min for legend+3
				expect(min).to.be.below(5824) // max for legend+3
				expect(max).to.be.above(291) // min for legend+3
				expect(max).to.be.below(5824) // max for legend+3

				expect(min).to.equal(3494)
				expect(max).to.equal(4659)
			})
		})

		describe('medium', function() {

			it('should work', () => {
				const med = get_medium_damage({
					slot: InventorySlot.weapon,
					base_hid: 'luth',
					qualifier1_hid: 'simple',
					qualifier2_hid: 'mercenary',
					quality: 'legendary',
					base_strength: 14,
					enhancement_level: 3,
				})
				expect(med).to.be.a.number
				expect(med).to.be.above(291) // min for legend+3
				expect(med).to.be.below(5824) // max for legend+3
				expect(med).to.equal((4659 + 3494) / 2)
			})
		})
	})
})
