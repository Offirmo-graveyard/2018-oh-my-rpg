import {
	CharacterStat,
	State,

	factory,
	increase_stat,
} from '.'

describe('🤕 ❤️  Character stats logic', function() {

	describe('🆕  initial state', function() {

		it('should have correct defaults', function() {
			const state = factory()
			expect(state).to.deep.equal({
				level: 1,

				health: 1,
				mana: 0,

				strength: 1,
				agility: 1,
				vitality: 1,
				wisdom: 1,
				luck: 1
			})
		})
	})

	describe('⬆ stat increase', function() {

		it('should fail on invalid amount', function() {
			let state = factory()

			function increase_0() {
				state = increase_stat(state, CharacterStat.agility, 0)
			}
			expect(increase_0).to.throw('invalid amount!')

			function decrease() {
				state = increase_stat(state, CharacterStat.agility, -1)
			}
			expect(decrease).to.throw('invalid amount!')
		})

		it('should work in nominal case', function() {
			let state = factory()

			state = increase_stat(state, CharacterStat.agility)
			expect(state.agility).to.equal(2)
			expect(state).to.deep.equal({
				level: 1,

				health: 1,
				mana: 0,

				strength: 1,
				agility: 2,
				vitality: 1,
				wisdom: 1,
				luck: 1
			})

			state = increase_stat(state, CharacterStat.agility, 2)
			expect(state.agility).to.equal(4)

			expect(state).to.deep.equal({
				level: 1,

				health: 1,
				mana: 0,

				strength: 1,
				agility: 4,
				vitality: 1,
				wisdom: 1,
				luck: 1
			})

			state = increase_stat(state, CharacterStat.agility)
			expect(state.agility).to.equal(5)

			expect(state).to.deep.equal({
				level: 1,

				health: 1,
				mana: 0,

				strength: 1,
				agility: 5,
				vitality: 1,
				wisdom: 1,
				luck: 1
			})
		})
	})
})
