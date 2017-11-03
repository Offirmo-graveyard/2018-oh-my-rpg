import { partial } from 'lodash'
import { ItemQuality, InventorySlot, Item, ITEM_SLOTS } from '@oh-my-rpg/definitions'
import { InventoryCoordinates, State as InventoryState, iterables_unslotted, get_item_in_slot } from '@oh-my-rpg/state-inventory'
import * as RichText from '@oh-my-rpg/rich-text-format'
import { State as WalletState, ALL_CURRENCIES, Currency, get_currency_amount } from '@oh-my-rpg/state-wallet'

import { render_item } from './items'

function inventory_coordinate_to_sortable_alpha_index(coord: InventoryCoordinates): string {
	return ('0' + (coord + 1)).slice(-2)
}

function render_inventory(inventory: InventoryState): RichText.Document {
	const $doc = RichText.ordered_list().done()

	const misc_items = Array.from(iterables_unslotted(inventory))
	misc_items.forEach((i: Item, index: number) => {
		if (!i) return
		$doc.$sub[inventory_coordinate_to_sortable_alpha_index(index)] = render_item(i)
		// TODO add coordinates
	})

	return $doc
}

function render_equipment(inventory: InventoryState): RichText.Document {
	const $doc = RichText.unordered_list().done()

	ITEM_SLOTS.forEach((slot: InventorySlot) => {
		const item = get_item_in_slot(inventory, slot)
		const $doc_item = RichText.span()
			//.addClass('item--' + slot)
			.pushText((slot + '   ').slice(0, 6))
			.pushText(': ')
			.pushNode(item
				? render_item(item)
				: RichText.span().pushText('-').done()
			)
			.done()
		$doc.$sub[slot] = $doc_item
	})

	return $doc
}

function render_wallet(wallet: WalletState): RichText.Document {
	const $doc = RichText.unordered_list().done()

	ALL_CURRENCIES.forEach((c: Currency) => {
		const amount = get_currency_amount(wallet, c)
		const $doc_currency = RichText.span()
			.addClass('currency--' + c)
			.pushText('{{qty}} ' + c + (amount === 1 ? '' : 's')) // TODO localize properly ;)
			.done()

		$doc_currency.$sub.qty = RichText.span().pushText('' + amount).done() // TODO format according to locale?
		$doc.$sub[c] = $doc_currency
	})

	return $doc
}


export {
	render_inventory,
	render_equipment,
	render_wallet,
}
