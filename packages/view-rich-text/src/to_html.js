"use strict";

function apply_type($type, str, $classes) {
	if ($type === 'br')
		return '<br/>\n'

	if ($type === 'hr')
		return '\n<hr/>\n'

	let result = `<${$type}`
	if ($classes.length)
		result += ` class="${$classes.join(' ')}"`
	result += `>${str}</${$type}>`

	return result
}


module.exports = {
	on_node_enter: () => '',
	on_concatenate_str: ({state, str}) => state + str,
	on_concatenate_subnode: ({state, sub_state}) => state + sub_state,
	on_type: ({state: str, $type, $node: {$classes}}) => apply_type($type, str, $classes),
}

