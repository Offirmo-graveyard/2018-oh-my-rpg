"use strict";

const { stylize_string } = require('../libs')

const LIB = 'rich_text_to_ansi'

const WIDTH_COMPENSATION = ' '

// TODO handle fixed width?
// TODO handle boxification

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

function apply_class($class, str) {
	switch($class) {
		case 'item__name':
			return stylize_string.bold(str)

		case 'item--quality--common':
			return stylize_string.gray(str)
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
			return '🛡 ' + WIDTH_COMPENSATION + str
		case 'item--weapon':
			return '⚔ ' + WIDTH_COMPENSATION + str
		case 'currency--coin':
			return '💰 ' + WIDTH_COMPENSATION + str
		case 'currency--token':
			return '💠 ' + WIDTH_COMPENSATION + str

		/*


	return `💰  ${wallet.coin_count} coins${coins_update_notice}
💠  ${wallet.token_count} tokens${tokens_update_notice}`
		 */
		case 'item--enhancement':
		case 'armor--values':
		case 'weapon--values':
		case 'item':
		case 'inventory--equipment':
		case 'inventory--wallet':
		case 'inventory--unslotted':
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

const callbacks = {
	on_node_enter: () => '',
	on_concatenate_str: ({state, str}) => state + str,
	on_concatenate_sub_node,
	on_class_after: ({state, $class}) => apply_class($class, state),
	on_type: ({state, $type}) => apply_type($type, state),
	on_type_br: ({state}) => state + '\n',
	on_type_hr: ({state}) => state + '\n------------------------------------------------------------\n',
}

module.exports = callbacks
