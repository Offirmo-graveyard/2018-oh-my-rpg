/////////////////////

import { partial } from 'lodash'

import { Random, Engine } from '@offirmo/random'
import { ItemQuality, InventorySlot, Item, ITEM_SLOTS } from '@oh-my-rpg/definitions'
import { Weapon, get_damage_interval as get_weapon_damage_interval } from '@oh-my-rpg/logic-weapons'
import { Armor, get_damage_reduction_interval as get_armor_damage_reduction_interval } from '@oh-my-rpg/logic-armors'
import { State as InventoryState, iterables_unslotted, get_item_in_slot } from '@oh-my-rpg/state-inventory'
import { State as WalletState, Currency, get_currency_amount } from '@oh-my-rpg/state-wallet'
import { State as CharacterState, CharacterStat, CHARACTER_STATS } from '@oh-my-rpg/state-character'
import { Adventure } from '@oh-my-rpg/state-the-boring-rpg'

import { TextStyle, RenderingOptions } from './types'

const DEFAULT_RENDERING_OPTIONS: RenderingOptions = {
	globalize: {
		formatMessage: (s: any) => s,
		formatNumber: (n: any) => `${n}`,
	},
	stylize: (style: string, s: string) => s
}

/////////////////////

function get_style_for_quality(quality: ItemQuality): TextStyle {
	switch (quality) {
		case ItemQuality.common:
			return TextStyle.item_quality_common
		case ItemQuality.uncommon:
			return TextStyle.item_quality_uncommon
		case ItemQuality.rare:
			return TextStyle.item_quality_rare
		case ItemQuality.epic:
			return TextStyle.item_quality_epic
		case ItemQuality.legendary:
			return TextStyle.item_quality_legendary
		case ItemQuality.artifact:
			return TextStyle.item_quality_artifact
		default:
			throw new Error(`get_style_for_quality(): Unknown ItemQuality : ${quality}`)
	}
}

function get_item_icon_for(i: Item | null): string {
	if (!i)
		return '⋯'

	switch(i.slot) {
		case InventorySlot.weapon:
			return '⚔'
		case InventorySlot.armor:
			return '🛡'
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

function render_weapon(w: Weapon, options: RenderingOptions = DEFAULT_RENDERING_OPTIONS): string {
	if (w.slot !== InventorySlot.weapon) throw new Error(`render_weapon(): can't render a ${w.slot} !`)

	const name = `${w.qualifier1_hid}.${w.base_hid}.of.the.${w.qualifier2_hid}`
	const enhancement_level = w.enhancement_level
		? ` +${w.enhancement_level}`
		: ''
	const [min_damage, max_damage] = get_weapon_damage_interval(w)

	return options.stylize(get_style_for_quality(w.quality), `${name}${enhancement_level}`) + ` [${min_damage} ↔ ${max_damage}]`
}

function render_armor(a: Armor, options: RenderingOptions = DEFAULT_RENDERING_OPTIONS): string {
	if (a.slot !== InventorySlot.armor) throw new Error(`render_armor(): can't render a ${a.slot} !`)

	const name = `${a.qualifier1_hid}.${a.base_hid}.of.the.${a.qualifier2_hid}`
	const enhancement_level = a.enhancement_level
		? ` +${a.enhancement_level}`
		: ''
	const [min_dmg_reduc, max_dmg_reduc] = get_armor_damage_reduction_interval(a)

	return options.stylize(get_style_for_quality(a.quality), `${name}${enhancement_level}`) + ` [${min_dmg_reduc} ↔ ${max_dmg_reduc}]`
}

function render_item(i: Item | null, options: RenderingOptions = DEFAULT_RENDERING_OPTIONS): string {
	if (!i)
		return ''

	switch(i.slot) {
		case InventorySlot.weapon:
			return render_weapon(i as Weapon, options)
		case InventorySlot.armor:
			return render_armor(i as Armor, options)
		default:
			throw new Error(`render_item(): don't know how to render a "${i.slot}" !`)
	}
}

function render_characteristics(state: CharacterState, options: RenderingOptions = DEFAULT_RENDERING_OPTIONS): string {
	const {last_adventure: la} = options

	return CHARACTER_STATS.map((stat: CharacterStat) => {
		const icon = get_characteristic_icon_for(stat)
		const label = stat
		const value = state[stat]

		const padded_label = `${label}............`.slice(0, 11)
		const padded_human_values = `.......${value}`.slice(-4)

		const update_notice = options.stylize(TextStyle.change_outline,
			la && la.gains && la.gains[stat]
			? ` increased by ${la.gains[stat]}! 🆙`
			: ''
		)

		return `${icon}  ${padded_label}${padded_human_values}${update_notice}`
	}).join('\n')
}

function render_equipment(inventory: InventoryState, options: RenderingOptions = DEFAULT_RENDERING_OPTIONS): string {
	const equiped_items = ITEM_SLOTS.map(partial(get_item_in_slot, inventory))
	const {last_adventure: la} = options

	return equiped_items.map((i: Item | null, index: number) => {
		const padded_slot = `${ITEM_SLOTS[index]}  `.slice(0, 6)
		if (!i)
			return `${padded_slot}: -`

		const icon = get_item_icon_for(i)
		const label = render_item(i, options)

		const update_notice = options.stylize(TextStyle.change_outline,
			i && la && la.gains && (
					(la.gains.improved_weapon && i.slot === 'weapon')
				|| (la.gains.improved_armor && i.slot === 'armor')
			)
			? ` enhanced! 🆙`
			: ''
		)

		return `${padded_slot}: ${icon}  ${label}${update_notice}`
	}).join('\n')
}

function render_inventory(inventory: InventoryState, options: RenderingOptions = DEFAULT_RENDERING_OPTIONS): string {
	const misc_items = Array.from(iterables_unslotted(inventory))
	const {last_adventure: la} = options

	return misc_items.map((i: Item, index: number) => {
		const icon = get_item_icon_for(i)
		const label = render_item(i, options)
		const padded_human_index = `  ${index + 1}.`.slice(-3)

		const update_notice = options.stylize(TextStyle.change_outline,
			i && la && (la.gains.weapon === i || la.gains.armor === i)
			? ` new! 🎁`
			: ''
		)

		return `${padded_human_index} ${icon}  ${label}${update_notice}`
	}).join('\n')
}

function render_wallet(wallet: WalletState, options: RenderingOptions = DEFAULT_RENDERING_OPTIONS): string {
	const {last_adventure: la} = options

	const coins_update_notice = options.stylize(TextStyle.change_outline,
		la && la.gains.coins
		? ` gained ${la.gains.coins}! 🆙`
		: ''
	)
	const tokens_update_notice = options.stylize(TextStyle.change_outline,
		la && la.gains.tokens
		? ` gained ${la.gains.tokens}! 🆙`
		: ''
	)

	return `💰  ${wallet.coin_count} coins${coins_update_notice}
💠  ${wallet.token_count} tokens${tokens_update_notice}`
}

function render_adventure(a: Adventure, options: RenderingOptions = DEFAULT_RENDERING_OPTIONS): string {
	const icon = '📃' //'⚔'
	let res = `${icon}  `

	const g = options.globalize

	const gains_for_display = Object.assign(
		{},
		a.gains,
		{
			formattedCoins: a.gains.coins ? g.formatNumber(a.gains.coins) : '',
			formattedWeapon: a.gains.weapon ? render_item(a.gains.weapon, options) : '',
			formattedArmor: a.gains.armor ? render_item(a.gains.armor, options) : '',
		}
	)

	const raw_message = g.formatMessage(`clickmsg/${a.hid}`, gains_for_display)
	res += raw_message.trim().replace('\n', ' ')

	// TODO loot
	if (a.gains.weapon)
		res += `\nNew item: ` + gains_for_display.formattedWeapon
	if (a.gains.armor)
		res += `\nNew item: ` + gains_for_display.formattedArmor

	return res
}

/////////////////////

export {
	TextStyle,
	RenderingOptions,
	DEFAULT_RENDERING_OPTIONS,

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
