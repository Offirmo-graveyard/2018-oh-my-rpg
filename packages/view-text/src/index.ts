/////////////////////

import { Random, Engine } from '@offirmo/random'
import { ItemQuality, InventorySlot } from '@oh-my-rpg/definitions'
import { Weapon, get_damage_interval as get_weapon_damage_interval } from '@oh-my-rpg/logic-weapons'
import { Armor, get_damage_reduction_interval as get_armor_damage_reduction_interval } from '@oh-my-rpg/logic-armors'

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

// note: we don't render the quality to allow coloring according to the environment (ansi, html)
function render_weapon(w: Weapon): string {
	if (w.slot !== InventorySlot.weapon) throw new Error(`render_weapon(): can't render a ${w.slot}!`)

	const name = `${w.qualifier1_hid}.${w.base_hid}.of.the.${w.qualifier2_hid}`
	const enhancement_level = w.enhancement_level
		? ` +${w.enhancement_level}`
		: ''
	const [min_damage, max_damage] = get_weapon_damage_interval(w)

	return `${name}${enhancement_level} [${min_damage}⇢ ${max_damage}]`
}

// note: we don't render the quality to allow coloring according to the environment (ansi, html)
function render_armor(a: Armor): string {
	if (a.slot !== InventorySlot.armor) throw new Error(`render_armor(): can't render a ${a.slot}!`)

	const name = `${a.qualifier1_hid}.${a.base_hid}.of.the.${a.qualifier2_hid}`
	const enhancement_level = a.enhancement_level
		? ` +${a.enhancement_level}`
		: ''
	const [min_dmg_reduc, max_dmg_reduc] = get_armor_damage_reduction_interval(a)

	return `${name}${enhancement_level} [${min_dmg_reduc}⇢ ${max_dmg_reduc}]`
}

/////////////////////

export {
	get_ansi_color_for_quality,
	get_html_color_for_quality,
	render_weapon,
	render_armor,
}

/////////////////////
