"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe('💰 💰 💎  Money wallet', function () {
    const EXPECTED_CURRENCY_SLOT_COUNT = 2;
    describe('🆕 initial state', function () {
        it('should have correct defaults to 0', function () {
            const state = _1.factory();
            expect(_1.ALL_CURRENCIES).to.have.lengthOf(EXPECTED_CURRENCY_SLOT_COUNT);
            expect(Object.keys(state)).to.have.lengthOf(EXPECTED_CURRENCY_SLOT_COUNT);
            expect(_1.get_currency_amount(state, _1.Currency.coin), _1.Currency.coin).to.equal(0);
            expect(_1.get_currency_amount(state, _1.Currency.token), _1.Currency.token).to.equal(0);
        });
    });
    describe('📥 currency addition', function () {
        it('should work on initial state', function () {
            let state = _1.factory();
            state = _1.add_amount(state, _1.Currency.coin, 3);
            expect(_1.get_currency_amount(state, _1.Currency.coin), _1.Currency.coin).to.equal(3);
            expect(_1.get_currency_amount(state, _1.Currency.token), _1.Currency.token).to.equal(0);
        });
        it('should work on simple non-empty state', function () {
            let state = _1.factory();
            state = _1.add_amount(state, _1.Currency.coin, 3);
            state = _1.add_amount(state, _1.Currency.coin, 6);
            expect(_1.get_currency_amount(state, _1.Currency.coin), _1.Currency.coin).to.equal(9);
            expect(_1.get_currency_amount(state, _1.Currency.token), _1.Currency.token).to.equal(0);
        });
        it('should cap to a limit');
    });
    describe('📤 currency withdraw', function () {
        it('should throw on empty currency slot', function () {
            let state = _1.factory();
            function remove() {
                state = _1.remove_amount(state, _1.Currency.coin, 3);
            }
            expect(remove).to.throw('state-wallet: can\'t remove more than available, no credit !');
        });
        it('should throw on currency slot too low', function () {
            let state = _1.factory();
            state = _1.add_amount(state, _1.Currency.coin, 3);
            function remove() {
                state = _1.remove_amount(state, _1.Currency.coin, 6);
            }
            expect(remove).to.throw('state-wallet: can\'t remove more than available, no credit !');
        });
        it('should work in nominal case', function () {
            let state = _1.factory();
            state = _1.add_amount(state, _1.Currency.coin, 3);
            state = _1.remove_amount(state, _1.Currency.coin, 2);
            expect(_1.get_currency_amount(state, _1.Currency.coin), _1.Currency.coin).to.equal(1);
            expect(_1.get_currency_amount(state, _1.Currency.token), _1.Currency.token).to.equal(0);
        });
    });
    describe('misc currency iteration', function () {
        it('should yield all currency slots');
    });
});
//# sourceMappingURL=index_spec.js.map