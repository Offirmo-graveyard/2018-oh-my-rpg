
import {
	Currency,
	State,
	ALL_CURRENCIES,

	factory,
	add_amount,
	remove_amount,

	get_currency_amount,
	iterables_currency,
} from '.'

describe('💰 💰 💎  Money wallet', function() {
	const EXPECTED_CURRENCY_SLOT_COUNT = 2

	describe('🆕 initial state', function() {

		it('should have correct defaults to 0', function() {
			const state = factory()
			expect(ALL_CURRENCIES).to.have.lengthOf(EXPECTED_CURRENCY_SLOT_COUNT)
			expect(Object.keys(state)).to.have.lengthOf(EXPECTED_CURRENCY_SLOT_COUNT)

			expect(get_currency_amount(state, Currency.coin), Currency.coin).to.equal(0)
			expect(get_currency_amount(state, Currency.token), Currency.token).to.equal(0)
		})
	})

	describe('📥 currency addition', function() {

		it('should work on initial state', function() {
			let state = factory()
			state = add_amount(state, Currency.coin, 3)
			expect(get_currency_amount(state, Currency.coin), Currency.coin).to.equal(3)
			expect(get_currency_amount(state, Currency.token), Currency.token).to.equal(0)
		})

		it('should work on simple non-empty state', function() {
			let state = factory()
			state = add_amount(state, Currency.coin, 3)
			state = add_amount(state, Currency.coin, 6)
			expect(get_currency_amount(state, Currency.coin), Currency.coin).to.equal(9)
			expect(get_currency_amount(state, Currency.token), Currency.token).to.equal(0)
		})

		it('should cap to a limit')
	})

	describe('📤 currency withdraw', function() {

		it('should throw on empty currency slot', function() {
			let state = factory()
			function remove() {
				state = remove_amount(state, Currency.coin, 3)
			}
			expect(remove).to.throw('state-wallet: can\'t remove more than available, no credit !')
		})

		it('should throw on currency slot too low', function() {
			let state = factory()
			state = add_amount(state, Currency.coin, 3)
			function remove() {
				state = remove_amount(state, Currency.coin, 6)
			}
			expect(remove).to.throw('state-wallet: can\'t remove more than available, no credit !')
		})

		it('should work in nominal case', function() {
			let state = factory()
			state = add_amount(state, Currency.coin, 3)
			state = remove_amount(state, Currency.coin, 2)

			expect(get_currency_amount(state, Currency.coin), Currency.coin).to.equal(1)
			expect(get_currency_amount(state, Currency.token), Currency.token).to.equal(0)
		})
	})

	describe('misc currency iteration', function() {

		it('should yield all currency slots')
	})
})
