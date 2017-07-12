"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.Currency = types_1.Currency;
/////////////////////
const ALL_CURRENCIES = [
    types_1.Currency.coin,
    types_1.Currency.token,
];
exports.ALL_CURRENCIES = ALL_CURRENCIES;
function factory() {
    return {
        coin_count: 0,
        token_count: 0,
    };
}
exports.factory = factory;
/////////////////////
function currency_to_state_entry(currency) {
    return `${currency}_count`;
}
function change_amount_by(state, currency, amount) {
    switch (currency) {
        case types_1.Currency.coin:
            state.coin_count += amount;
            break;
        case types_1.Currency.token:
            state.token_count += amount;
            break;
        default:
            throw new Error(`state-wallet: unrecognized currency: "${currency}`);
    }
    return state;
}
/////////////////////
function add_amount(state, currency, amount) {
    if (amount <= 0)
        throw new Error(`state-wallet: can't add a <= 0 amount`);
    return change_amount_by(state, currency, amount);
}
exports.add_amount = add_amount;
function remove_amount(state, currency, amount) {
    if (amount <= 0)
        throw new Error(`state-wallet: can't remove a <= 0 amount`);
    if (amount > get_currency_amount(state, currency))
        throw new Error(`state-wallet: can't remove more than available, no credit !`);
    return change_amount_by(state, currency, -amount);
}
exports.remove_amount = remove_amount;
/////////////////////
function get_currency_amount(state, currency) {
    return state[currency_to_state_entry(currency)];
}
exports.get_currency_amount = get_currency_amount;
function* iterables_currency(state) {
    yield* ALL_CURRENCIES;
}
exports.iterables_currency = iterables_currency;
/////////////////////
//# sourceMappingURL=index.js.map