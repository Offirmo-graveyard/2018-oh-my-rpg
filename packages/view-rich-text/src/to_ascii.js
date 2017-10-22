"use strict";

const { stylize_string } = require('./libs')

// TODO handle fixed width
// TODO handle boxification


function apply_class({$class, str}) {
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

module.exports = {
	on_node_enter: () => '',
	on_concatenate_str: ({state, str}) => state + str,
	on_concatenate_subnode: ({state, sub_state}) => state + sub_state,
	on_class_after: ({state: str, $class}) => apply_class({$class, str}),
	on_type_br: ({state}) => state + '\n',
	on_type_hr: ({state}) => state + '\n------------------------------------------------------------\n',
}
