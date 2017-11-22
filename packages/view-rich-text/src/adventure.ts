import { difference } from 'lodash'
import { InventorySlot, Item, ITEM_SLOTS } from '@oh-my-rpg/definitions'
import { CHARACTER_STATS, CharacterAttribute } from '@oh-my-rpg/state-character'
import { i18n_messages as I18N_ADVENTURES } from '@oh-my-rpg/logic-adventures'
import { Adventure, GainType } from '@oh-my-rpg/state-the-boring-rpg'
import { State as WalletState, ALL_CURRENCIES, Currency, get_currency_amount } from '@oh-my-rpg/state-wallet'

import * as RichText from '@oh-my-rpg/rich-text-format'

import { render_item } from './items'
import { render_currency_amount } from './wallet'
import { render_monster } from './monster'
import {render_attributes} from "./attributes";


function render_adventure_gain(a: Adventure, gain_type: GainType, gains_for_display: {[k:string]: RichText.Document}): RichText.Document {
	const builder = RichText.span()
		.addClass('adventure__gain')

	/*
	switch(gain_type) {
		case 'weapon':
			builder.pushText('New item: ').pushNode(gains_for_display.formattedWeapon, 'weapon`
		case 'armor':
			return `🛡  New item: ${gains_for_display.formattedArmor}`
		case 'coins':
			return `💰  Received ${gains_for_display.formattedCoins} coins`
		case 'level':
			return `🆙  Leveled up!`
		case 'health':
		case 'mana':
		case 'strength':
		case 'agility':
		case 'charisma':
		case 'wisdom':
		case 'luck':
			return `🆙  ${gain_type} increased!`
		default:
			return `🔥  TODO gain message for "${gain_type}"`
	}



		.pushText('class: {{class}}')
		.pushRawNode(
			RichText.span().addClass('avatar__name').pushText(state.name).done(),
			'name'
		)
		.pushRawNode(
			RichText.span().addClass('avatar__class').pushText(state.klass).done(),
			'class'
		)
		.done()
*/
	return builder.done()
}

function render_adventure(a: Adventure): RichText.Document {
	const handled_properties: string[] = [] // internal check
	const gains: any = a.gains // for typing

	const $loot_list = RichText.unordered_list().done()

	const $sub: { [k: string]: RichText.Document } = {}

	/////// LOOT ///////
	ITEM_SLOTS.forEach((slot: InventorySlot) => {
		//console.info('handling ' + slot)
		if (!gains[slot]) return

		const $doc = render_item(gains[slot])
		$sub.item = $doc // generic one
		$loot_list.$sub[slot] = $sub[slot] = $doc
		handled_properties.push(slot)
	})

	ALL_CURRENCIES.forEach((currency: Currency) => {
		//console.info('handling ' + currency)
		if (!gains[currency]) return

		const $doc = render_currency_amount(currency, gains[currency])
		$loot_list.$sub[currency] = $sub[currency] = $doc
		handled_properties.push(currency)
	})

	/////// Attributes / knowledge ///////
	CHARACTER_STATS.forEach((attr: CharacterAttribute) => {
		//console.info('handling ' + attr)
		if (!gains[attr]) return

		$sub.attr = $sub[attr] = RichText.span().pushText('' + gains[attr]).done()
		$sub.attr_name = RichText.span().pushText(attr).done()
		handled_properties.push(attr)
	})

	/////// Misc ///////

	if (a.encounter)
		$sub.encounter = render_monster(a.encounter)

	// no need for render for now
	handled_properties.push('armor_improvement')
	handled_properties.push('weapon_improvement')

	/////// checks ///////
	const gain_properties = Object.keys(gains).filter(prop => !!gains[prop])
	const unhandled_properties = difference(gain_properties, handled_properties)
	if (unhandled_properties.length) {
		console.error(`render_adventure(): handled gain properties: "${handled_properties}"`)
		console.error(`render_adventure(): unhandled gain properties: "${unhandled_properties}"!`)
		throw new Error(`render_adventure(): unhandled gain properties!`)
	}

	/////// Final //////
	const _ = I18N_ADVENTURES.en as any
	const story = _.adventures[a.hid]
	const hasLoot = !!Object.keys($loot_list.$sub).length
	const $loot = hasLoot
		? RichText.section().pushText('Loot:').pushNode($loot_list, 'list').done()
		: RichText.span().done()

	// TODO weap improvement ?
	// TODO charac gains?

	const $doc = RichText.section()
		.pushText(story)
		.pushNode($loot, 'loot')
		.done()

	$sub.loot = $loot
	$doc.$sub = $sub

	/*
	const charac_name: string = CHARACTER_STATS.find(stat => !!a.gains[stat]) as string

	// formatting to natural language
	const gains_for_display = {
		...(a.gains as any), // ignore warning for weapons etc.
		charac_name,
		charac: (a.gains as any)[charac_name],
	}


	const raw_message_multiline = g.formatMessage(`adventures/${a.hid}`, {
		encounter,
		...gains_for_display
	})
	const raw_message = raw_message_multiline
		.split('\n')
		.map((s: string) => s.trim())
		.filter((s: string) => !!s)
		.join(' ')

	const gained: GainType[] = Object.keys(a.gains)
		.filter((gain_type: GainType) => !!(a.gains as any)[gain_type])
		.map((gain_type: GainType) => {
			if (!Enum.isType(GainType, gain_type))
				throw new Error(`render_adventure(): unexpected gain type "${gain_type}"!`)
			return gain_type
		})

	const msg_parts = [
		raw_message,
		'',
		...gained.map((gain_type: GainType) => render_adventure_gain(a, gain_type, gains_for_display))
	]

	return msg_parts.join('\n')*/

	return $doc
}



export {
	render_adventure,
}
