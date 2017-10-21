#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"
"use strict";

console.log('Hello world!')

const LIB = 'view-rich-text'

const { prettify_json, stylize_string } = require('./libs')


const render_fns_html = {
	apply_type($type, str, {$classes}) {
		let result = `<${$type}`
		if ($classes.length)
			result += ` class="${$classes.join(' ')}"`
		result += `>${str}</${$type}>`

		return result
	},

	apply_class($class, str, {$type, $classes}) {
		return str
	},

	apply_filter($filter, str, {$type, $classes, $filters}) {

		return str
	},
}


const render_fns_ascii = {
	apply_type($type, str, {$classes}) {
		return str
	},

	apply_class($class, str, {$type, $classes}) {
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
				console.warn(`${LIB}: unknown class "${$class}", ignored.`) // todo avoid repetition
				return str
		}
	},

	apply_filter($filter, str, {$type, $classes, $filters}) {
		switch($filter) {
			case 'Capitalize':
				return str[0].toUpperCase() + str.slice(1)
			default:
				console.warn(`${LIB}: unknown filter "${$filter}", ignored.`) // todo avoid repetition
				return str
		}
	},
}


function replace_patterns($content, $subnodes, render_functions) {
	const split1 = $content.split('{{')

	let result = split1.shift()
	result = split1.reduce((result, paramAndText) => {
		const split2 = paramAndText.split('}}')
		if (split2.length !== 2)
			throw new Error(`${LIB}: syntax error in content "${$content}"!`)

		const [ subnode_id, ...$filters ] = split2.shift().split('|')
		if (!$subnodes.hasOwnProperty(subnode_id))
			throw new Error(`${LIB}: syntax error in content "${$content}" is referring to an unknown sub-node "${subnode_id}"!`)

		let part1 = render($subnodes[subnode_id], render_functions)

		const { $type, $classes } = $subnodes[subnode_id]
		part1 = $filters.reduce((result, $filter) => {
			return render_functions.apply_filter($filter, result, { $type, $classes, $filters })
		}, part1)
		// TODO detect unused $subnodes?

		const part2 = split2[0]
		result += part1 + part2
		return result
	}, result)

	return result
}

function render($doc, render_functions, { parent, parent_classes } = {}) {
	const {
		$v = 1,
		$type = 'span',
		$classes = [],
		$content,
		...$subnodes
	} = $doc

	// TODO validation

	/*console.log(prettify_json({
		$v,
		$type,
		$classes,
		$content,
		$subnodes,
	}))*/

	let result = replace_patterns($content, $subnodes, render_functions, { $type, $classes })
	// TODO parent, parent classes
	result = $classes.reduce(
		(result, klass) => render_functions.apply_class(klass, result, { $type, $classes }),
		result
	)
	result = render_functions.apply_type($type, result, { $classes })


	return result
}

console.log(render(
	{
		$v: 1,
		$type: 'p',
		$content: 'You are in {{place}}. You meet {{npc}}. He gives you a {{item}}.',
		place: {
			$type: 'span',
			$classes: ['place'],
			$content: 'the country of {{name}}',
			name: {
				$classes: ['place-name'],
				$content: 'Foo',
			}
		},
		npc: {
			$type: 'span',
			$classes: ['person', 'npc', 'boss'],
			$content: 'John Smith',
		},
		item: {
			$type: 'span',
			$classes: ['item', 'item-weapon', 'item-quality-legendary'],
			$content: '{{weapon_name}} {{enhancement}}',
			weapon_name: {
				$classes: ['item-name', 'item-weapon-name'],
				$content: '{{qualifier2|Capitalize}} {{qualifier1|Capitalize}} {{base|Capitalize}}',
				qualifier2: {
					$type: 'span',
					$classes: ['weapon-qualifier-2'],
					$content: 'warfield king’s',
				},
				qualifier1: {
					$type: 'span',
					$classes: ['weapon-qualifier-1'],
					$content: 'onyx',
				},
				base: {
					$type: 'span',
					$classes: ['weapon-base'],
					$content: 'longsword',
				},
			},
			enhancement: {
				$type: 'span',
				$content: '+3',
			},
		}
	},
	//render_fns_html,
	render_fns_ascii,
))


// TODO list

// TODO text
