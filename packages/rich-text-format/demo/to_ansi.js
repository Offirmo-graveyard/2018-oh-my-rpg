"use strict";

const { stylize_string } = require('./libs')

const LIB = 'to_ansi'

// TODO handle fixed width
// TODO handle boxification

function apply_type($type, str) {
	switch($type) {
		case 'p':
			// nothing to do for those one
			return str
		case 'strong':
			return stylize_string.bold(str)
		case 'em':
			return stylize_string.italic(str)
		default:
			console.warn(`${LIB}: unknown type "${$type}", ignored.`) // todo avoid repetition ?
			return str
	}
}

function apply_class($class, str) {
	switch($class) {
		case 'place':
			return stylize_string.green(str)
		case 'place-name':
		case 'item-name':
			return stylize_string.bold(str)
		case 'person':
			return stylize_string.blue(str)
		case 'item-weapon':
			return '⚔  ' + stylize_string.red(str)
		default:
			//console.warn(`${LIB}: unknown class "${$class}", ignored.`) // todo avoid repetition
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

module.exports = {
	on_node_enter: () => '',
	on_concatenate_str: ({state, str}) => state + str,
	on_concatenate_sub_node,
	on_class_after: ({state, $class}) => apply_class($class, state),
	on_type: ({state, $type}) => apply_type($type, state),
	on_type_br: ({state}) => state + '\n',
	on_type_hr: ({state}) => state + '\n------------------------------------------------------------\n',
}
