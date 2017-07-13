/////////////////////

import { partial } from 'lodash'

import { Random, Engine } from '@offirmo/random'
import { ItemQuality, InventorySlot, Item, ITEM_SLOTS } from '@oh-my-rpg/definitions'
import { Weapon, get_damage_interval as get_weapon_damage_interval } from '@oh-my-rpg/logic-weapons'
import { Armor, get_damage_reduction_interval as get_armor_damage_reduction_interval } from '@oh-my-rpg/logic-armors'
import { State as InventoryState, iterables_unslotted, get_item_in_slot } from '@oh-my-rpg/state-inventory'
import { State as WalletState, Currency, get_currency_amount } from '@oh-my-rpg/state-wallet'
import { State as CharacterState, CharacterStat, CHARACTER_STATS } from '@oh-my-rpg/state-character'
import {
	WEAPON_ICON,
	ARMOR_ICON,
} from './constants'
import { Adventure } from '@oh-my-rpg/the-boring-rpg'

/////////////////////

function get_ansi_color_for_quality(quality: ItemQuality): string {
	switch (quality) {
		case ItemQuality.common:
			return 'gray'
		case ItemQuality.uncommon:
			return 'green'
		case ItemQuality.rare:
			return 'blue'
		case ItemQuality.epic:
			return 'magenta'
		case ItemQuality.legendary:
			return 'red'
		case ItemQuality.artifact:
			return 'yellow'
		default:
			throw new Error(`get_ansi_color_for_quality(): Unknown ItemQuality : ${quality}`)
	}
}

// TODO better
function get_html_color_for_quality(quality: ItemQuality): string {
	switch (quality) {
		case ItemQuality.common:
			return 'gray'
		case ItemQuality.uncommon:
			return 'green'
		case ItemQuality.rare:
			return 'blue'
		case ItemQuality.epic:
			return 'magenta'
		case ItemQuality.legendary:
			return 'red'
		case ItemQuality.artifact:
			return 'yellow'
		default:
			throw new Error(`get_html_color_for_quality(): Unknown ItemQuality : ${quality}`)
	}
}

function get_item_icon_for(i: Item | null): string {
	if (!i)
		return '⋯'

	switch(i.slot) {
		case InventorySlot.weapon:
			return WEAPON_ICON
		case InventorySlot.armor:
			return ARMOR_ICON
		default:
			throw new Error(`get_item_icon_for(): no icon for slot "${i.slot}" !`)
	}
}

function get_characteristic_icon_for(stat: CharacterStat): string {
	switch(stat) {
		case CharacterStat.level:
			return '👶🏽'
		case CharacterStat.health:
			return '💗'
		case CharacterStat.mana:
			return '💙'

		case CharacterStat.agility:
			return '🤸🏽'
		case CharacterStat.luck:
			return '🤹🏼‍♀️'
		case CharacterStat.strength:
			// 🏋🏽
			// '💪🏽'
			return '🏋🏽'
		case CharacterStat.vitality:
			return '🏊🏽'
		case CharacterStat.wisdom:
			// '🙏🏽'
			return '👵🏽'
		default:
			throw new Error(`get_characteristic_icon_for(): no icon for stat "${stat}" !`)
	}
}

///////

// note: we don't render the quality to allow coloring according to the environment (ansi, html)
function render_weapon(w: Weapon): string {
	if (w.slot !== InventorySlot.weapon) throw new Error(`render_weapon(): can't render a ${w.slot} !`)

	const name = `${w.qualifier1_hid}.${w.base_hid}.of.the.${w.qualifier2_hid}`
	const enhancement_level = w.enhancement_level
		? ` +${w.enhancement_level}`
		: ''
	const [min_damage, max_damage] = get_weapon_damage_interval(w)

	return `${name}${enhancement_level} [${min_damage} ↔ ${max_damage}]`
}

// note: we don't render the quality to allow coloring according to the environment (ansi, html)
function render_armor(a: Armor): string {
	if (a.slot !== InventorySlot.armor) throw new Error(`render_armor(): can't render a ${a.slot} !`)

	const name = `${a.qualifier1_hid}.${a.base_hid}.of.the.${a.qualifier2_hid}`
	const enhancement_level = a.enhancement_level
		? ` +${a.enhancement_level}`
		: ''
	const [min_dmg_reduc, max_dmg_reduc] = get_armor_damage_reduction_interval(a)

	return `${name}${enhancement_level} [${min_dmg_reduc} ↔ ${max_dmg_reduc}]`
}

function render_item(i: Item | null): string {
	if (!i)
		return ''

	switch(i.slot) {
		case InventorySlot.weapon:
			return render_weapon(i as Weapon)
		case InventorySlot.armor:
			return render_armor(i as Armor)
		default:
			throw new Error(`render_item(): don't know how to render a "${i.slot}" !`)
	}
}

function render_characteristics(state: CharacterState, last_adventure?: Adventure): string {
	return CHARACTER_STATS.map((stat: CharacterStat) => {
		const icon = get_characteristic_icon_for(stat)
		const label = stat
		const value = state[stat]

		const padded_label = `${label}............`.slice(0, 11)
		const padded_human_values = `.......${value}`.slice(-4)

		const update_notice = last_adventure && last_adventure.gains[stat]
			? ` increased +${last_adventure.gains[stat]} 🆙`
			: ''

		return `${icon}  ${padded_label}${padded_human_values}${update_notice}`
	}).join('\n')
}

function render_equipment(inventory: InventoryState, last_adventure?: Adventure): string {
	const equiped_items = ITEM_SLOTS.map(partial(get_item_in_slot, inventory))

	return equiped_items.map((i: Item, index: number) => {
		const padded_slot = `${ITEM_SLOTS[index]}  `.slice(0, 6)
		const icon = get_item_icon_for(i)
		const label = render_item(i)
		// TODO handle if no item

		const update_notice = i && last_adventure && (
			(last_adventure.gains.improved_weapon && i.slot === 'weapon')
			|| (last_adventure.gains.improved_armor && i.slot === 'armor')
		)
			? ` enhanced +1! 🆙`
			: ''

		return `${padded_slot}: ${icon}  ${label}${update_notice}`
	}).join('\n')
}

function render_inventory(inventory: InventoryState, last_adventure?: Adventure): string {
	const misc_items = Array.from(iterables_unslotted(inventory))

	return misc_items.map((i: Item, index: number) => {
		const icon = get_item_icon_for(i)
		const label = render_item(i)
		const padded_human_index = `  ${index + 1}.`.slice(-3)

		const update_notice = i && last_adventure && (last_adventure.gains.weapon === i || last_adventure.gains.armor === i)
			? ` new 🎁`
			: ''

		return `${padded_human_index} ${icon}  ${label}${update_notice}`
	}).join('\n')
}

function render_wallet(wallet: WalletState, last_adventure?: Adventure): string {
	const padded_coins = `.......${wallet.coin_count}`.slice(-5)
	const padded_tokens = `.......${wallet.token_count}`.slice(-5)

	const coins_update_notice = last_adventure && last_adventure.gains.coins
		? ` gained +${last_adventure.gains.coins} 🆙`
		: ''
	const tokens_update_notice = last_adventure && last_adventure.gains.tokens
		? ` gained +${last_adventure.gains.tokens} 🆙`
		: ''

	return `💰  coins..${padded_coins}${coins_update_notice}
💠  tokens.${padded_tokens}${tokens_update_notice}`
}

function render_adventure(a: Adventure): string {
	const icon = '⚔'
	const text = a.hid
	let res = `${icon} ${text} TODO render_adventure`

	if (a.gains.weapon)
		res += `\nNew item: ` + render_item(a.gains.weapon)
	if (a.gains.armor)
		res += `\nNew item: ` + render_item(a.gains.armor)

	return res
}

/////////////////////

export {
	get_ansi_color_for_quality,
	get_html_color_for_quality,
	render_weapon,
	render_armor,
	render_item,
	render_characteristics,
	render_equipment,
	render_inventory,
	render_wallet,
	render_adventure,
}

/////////////////////
