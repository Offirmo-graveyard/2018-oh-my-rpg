import { Currency, State } from './types';
declare const ALL_CURRENCIES: string[];
declare function factory(): State;
declare function add_amount(state: State, currency: Currency, amount: number): State;
declare function remove_amount(state: State, currency: Currency, amount: number): State;
declare function get_currency_amount(state: Readonly<State>, currency: Currency): number;
declare function iterables_currency(state: Readonly<State>): IterableIterator<string>;
export { Currency, State, ALL_CURRENCIES, factory, add_amount, remove_amount, get_currency_amount, iterables_currency };
