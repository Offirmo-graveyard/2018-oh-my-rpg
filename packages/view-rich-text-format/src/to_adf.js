const { Document } = require('adf-builder')

function begin() {
	const doc = new Document()
	return {
		doc
	}
}

function end(state) {
	const { doc } = state
	return doc.toString()
}

/*
doc.paragraph()
	.text('See the ')
	.link('documention', 'https://example.com')
	.text(' ')
	.emoji('smile');
*/


function apply_type($type, str, {state, $node, $classes}) {
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

function apply_class($class, str, {$node, $type, $classes}) {
	return str
}

module.exports = {
	begin,
	end,
	on_node: () => {},

	apply_type_br: () => '<br/>\n',
	apply_type,
	apply_class,
}
