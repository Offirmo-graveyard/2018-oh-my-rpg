/////////////////////

import { partial } from 'lodash'

import { Random, Engine } from '@offirmo/random'
import { ItemQuality, InventorySlot, Item, ITEM_SLOTS } from '@oh-my-rpg/definitions'
import { Weapon, get_damage_interval as get_weapon_damage_interval } from '@oh-my-rpg/logic-weapons'
import { Armor, get_damage_reduction_interval as get_armor_damage_reduction_interval } from '@oh-my-rpg/logic-armors'
import { State as InventoryState, iterables_unslotted, get_item_in_slot } from '@oh-my-rpg/state-inventory'

import {
	WEAPON_ICON,
	ARMOR_ICON,
} from './constants'

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

function get_icon_for(i: Item | null): string {
	if (!i)
		return '⋯'

	switch(i.slot) {
		case InventorySlot.weapon:
			return WEAPON_ICON
		case InventorySlot.armor:
			return ARMOR_ICON
		default:
			throw new Error(`get_icon_for_slot(): no icon for "${i.slot}" !`)
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

function render_equipment(inventory: InventoryState): string {
	const equiped_items = ITEM_SLOTS.map(partial(get_item_in_slot, inventory))

	return equiped_items.map((i: Item, index: number) => {
		const padded_slot = `${ITEM_SLOTS[index]}  `.slice(0, 7)
		const icon = get_icon_for(i)
		const label = render_item(i)

		return `${padded_slot}: ${icon}  ${label}`
	}).join('\n')
}

function render_inventory(inventory: InventoryState): string {
	const misc_items = Array.from(iterables_unslotted(inventory))

	return misc_items.map((i: Item, index: number) => {
		const icon = get_icon_for(i)
		const label = render_item(i)
		const padded_human_index = `  ${index + 1}.`.slice(-3)

		return `${padded_human_index} ${icon}  ${label}`
	}).join('\n')
}

/////////////////////

export {
	get_ansi_color_for_quality,
	get_html_color_for_quality,
	render_weapon,
	render_armor,
	render_item,
	render_equipment,
	render_inventory,
}

/////////////////////
