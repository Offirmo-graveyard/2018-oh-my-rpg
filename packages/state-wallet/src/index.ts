/////////////////////

import {
	Currency,
	State,
} from './types'

/////////////////////

const ALL_CURRENCIES = [
	Currency.coin,
	Currency.token,
]

function factory(): State {
	return {
		coin_count: 0,
		token_count: 0,
	}
}

/////////////////////

function currency_to_state_entry(currency: Currency): string {
	return `${currency}_count`
}

function change_amount_by(state: State, currency: Currency, amount: number): State {
	switch(currency) {
		case Currency.coin:
			state.coin_count += amount
			break
		case Currency.token:
			state.token_count += amount
			break
		default:
			throw new Error(`state-wallet: unrecognized currency: "${currency}`)
	}

	return state
}

/////////////////////

function add_amount(state: State, currency: Currency, amount: number): State {
	if (amount <= 0)
		throw new Error(`state-wallet: can't add a <= 0 amount`)

	return change_amount_by(state, currency, amount)
}

function remove_amount(state: State, currency: Currency, amount: number): State {
	if (amount <= 0)
		throw new Error(`state-wallet: can't remove a <= 0 amount`)

	if (amount > get_currency_amount(state, currency))
		throw new Error(`state-wallet: can't remove more than available, no credit !`)

	return change_amount_by(state, currency, -amount)
}

/////////////////////

function get_currency_amount(state: Readonly<State>, currency: Currency): number {
	return (state as any)[currency_to_state_entry(currency)]
}

function* iterables_currency(state: Readonly<State>) {
	yield* ALL_CURRENCIES
}

/////////////////////

export {
	Currency,
	State,
	ALL_CURRENCIES,

	factory,
	add_amount,
	remove_amount,

	get_currency_amount,
	iterables_currency,
}

/////////////////////
