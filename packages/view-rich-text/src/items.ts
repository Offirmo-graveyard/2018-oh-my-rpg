import RichText from '@oh-my-rpg/rich-text-format'

import { i18n_messages: I18N_ADVENTURES } from '@oh-my-rpg/logic-adventures'
import { i18n_messages: I18N_ADVENTURES } from '@oh-my-rpg/logic-armors'
import { i18n_messages: I18N_ADVENTURES } from '@oh-my-rpg/logic-adventures'

import { TextClass } from './types'



const  = xxx
		require().i18n_messages.en,
		require('@oh-my-rpg/data/src/weapon_component/i18n').en,
		require('@oh-my-rpg/logic-armors').i18n_messages.en,


function render_armor(i: Armor): string {
	if (i.slot !== InventorySlot.armor)
		throw new Error(`render_armor(): can't render a ${i.slot}!`)

	const b = g.formatMessage(`armor/base/${i.base_hid}`, {})
	const q1 = g.formatMessage(`armor/qualifier1/${i.qualifier1_hid}`, {})
	const q2 = g.formatMessage(`armor/qualifier2/${i.qualifier2_hid}`, {})

	const parts = q2.startsWith('of')
		? [q1, b, q2]
		: [q2, q1, b]

	const name = parts.map(capitalize).join(' ')
	const enhancement_level = i.enhancement_level
		? ` +${i.enhancement_level}`
		: ''
	const [min, max] = get_armor_damage_reduction_interval(i)

	return options.stylize(get_style_for_quality(i.quality),
		`${i.quality} `
		+ options.stylize(TextStyle.important_part, name)
		+ `${enhancement_level}`
		)
		+ ` [${min} ↔ ${max}]`
}

function render_weapon(i: Weapon, options: RenderingOptions = DEFAULT_RENDERING_OPTIONS): string {
	if (i.slot !== InventorySlot.weapon) throw new Error(`render_weapon(): can't render a ${i.slot} !`)

	const g = options.globalize

	const b = g.formatMessage(`weapon/base/${i.base_hid}`, {})
	const q1 = g.formatMessage(`weapon/qualifier1/${i.qualifier1_hid}`, {})
	const q2 = g.formatMessage(`weapon/qualifier2/${i.qualifier2_hid}`, {})

	const parts = q2.startsWith('of')
		? [q1, b, q2]
		: [q2, q1, b]

	const name = parts.map(capitalize).join(' ')
	const enhancement_level = i.enhancement_level
		? ` +${i.enhancement_level}`
		: ''
	const [min, max] = get_weapon_damage_interval(i)

	return options.stylize(get_style_for_quality(i.quality),
		`${i.quality} `
		+ options.stylize(TextStyle.important_part, name)
		+ `${enhancement_level}`
		)
		+ ` [${min} ↔ ${max}]`
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

