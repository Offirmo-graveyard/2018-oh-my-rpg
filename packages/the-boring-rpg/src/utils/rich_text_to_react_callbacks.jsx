import React from 'react'

const LIB = 'rich_text_to_react'


function apply_type($type, str) {
	switch($type) {
		case 'li':
		case 'p':
		case 'span':
		case 'section':
			// nothing to do for those one
			return str
		case 'ol':
		case 'ul':
			return str + '\n'
		case 'strong':
			return stylize_string.bold(str)
		case 'heading':
			return '\n' + stylize_string.bold(str)
		case 'em':
			return stylize_string.italic(str)
		default:
			console.warn(`${LIB}: unknown type "${$type}", ignored.`) // todo avoid repetition ?
			return str
	}
}

function apply_class($class, str, hints = {}) {
	switch($class) {
		case 'item__name':
		case 'avatar__name':
		case 'avatar__class':
		case 'monster__name':
			return stylize_string.bold(str)

		case 'item--quality--common':
			//return stylize_string.gray(str)
			// no color cause we can't know if the user has a dark or light background = keep default
			return str
		case 'item--quality--uncommon':
			return stylize_string.green(str)
		case 'item--quality--rare':
			return stylize_string.blue(str)
		case 'item--quality--epic':
			return stylize_string.magenta(str)
		case 'item--quality--legendary':
			return stylize_string.red(str)
		case 'item--quality--artifact':
			return stylize_string.yellow(str)

		case 'item--armor':
			return '🛡 ' + str
		case 'item--weapon':
			return '⚔ ' + str
		case 'currency--coin':
			return '💰 ' + str
		case 'currency--token':
			return '💠 ' + str

		case 'attribute--level':
			return '👶 ' + str
		case 'attribute--health':
			return '💗 ' + str
		case 'attribute--mana':
			return '💙 ' + str
		case 'attribute--agility':
			return '🤸 ' + str
		case 'attribute--luck':
			return '🤹 ' + str
		case 'attribute--strength':
			return '🏋 ' + str
		case 'attribute--charisma':
			return '👨🎤 ' + str
		case 'attribute--wisdom':
			return '👵 ' + str

		case 'monster':
			return str + ' ' + hints.possible_emoji
		case 'monster--rank--common':
			return stylize_string.yellow(str)
		case 'monster--rank--elite':
			return stylize_string.yellow(str)
		case 'monster--rank--boss':
			return stylize_string.red(str)
		case 'rank--common':
			return str
		case 'rank--elite':
			return stylize_string.bold(str + '★')
		case 'rank--boss':
			return stylize_string.bold(str + ' 👑')

		case 'item--enhancement':
		case 'armor--values':
		case 'weapon--values':
		case 'item':
		case 'attributes':
		case 'inventory--equipment':
		case 'inventory--wallet':
		case 'inventory--backpack':
		case '':
			// no style
			return str

		default:
			console.warn(`${LIB}: unknown class "${$class}", ignored.`) // todo avoid repetition
			return str
	}
}

function on_concatenate_sub_node({state, sub_state, $id, $parent_node}) {
	if ($parent_node.$type === 'ul')
		return state + '\n - ' + sub_state

	if ($parent_node.$type === 'ol')
		return state + `\n ${(' ' + $id).slice(-2)}. ` + sub_state

	if ($parent_node.$type === 'strong')
		return state + stylize_string.bold(sub_state)

	return state + sub_state
}


function createNodeState() {
	return {

	}
}
const callbacks = {
	on_node_enter: createNodeState,
	on_node_exit: () => null,
	on_concatenate_str: ({state, str}) => state + str,
	on_concatenate_sub_node,
	on_class_after: ({state, $class, $node}) => apply_class($class, state, $node.$hints),
	on_type: ({state, $type}) => apply_type($type, state),
	on_type_br: ({state}) => state + '\n',
	on_type_hr: ({state}) => state + '\n------------------------------------------------------------\n',
}

module.exports = callbacks
