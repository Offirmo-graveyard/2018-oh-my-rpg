"use strict";

const LIB = 'view-rich-text'

const DEFAULT_CALLBACKS = {
	begin: () => {},
	end: () => {},
	on_node_enter: () => {},
	on_node_exit: ({state}) => state,
	on_concatenate_str: ({state}) => state,
	on_concatenate_subnode: ({state}) => state,
	on_subnode_id: ({state}) => state,
	on_filter: ({state}) => state,
	on_filter_Capitalize: ({state}) => {
		const str = '' + state
		return str[0].toUpperCase() + str.slice(1)
	},
	on_class_before: ({state}) => state,
	on_class_after: ({state}) => state,
	on_type: ({state}) => state,
}

const SUBNODE_BR = {
	$type: 'br',
	$content: '',
}

const SUBNODE_HR = {
	$type: 'hr',
	$content: '',
}

function walk_content({state, $content, $subnodes, callbacks, $node, depth}) {
	const split1 = $content.split('{{')

	state = callbacks.on_concatenate_str({
		state,
		str: split1.shift(),
		$node,
		depth,
	})

	state = split1.reduce((state, paramAndText) => {
		const split2 = paramAndText.split('}}')
		if (split2.length !== 2)
			throw new Error(`${LIB}: syntax error in content "${$content}"!`)

		const [ subnode_id, ...$filters ] = split2.shift().split('|')
		state = callbacks.on_subnode_id({
			state,
			id: subnode_id,
			$node,
			depth,
		})

		let $subnode = $subnodes[subnode_id]

		if (!$subnode && subnode_id === 'br')
			$subnode = SUBNODE_BR

		if (!$subnode && subnode_id === 'hr')
			$subnode = SUBNODE_HR

		if (!$subnode)
			throw new Error(`${LIB}: syntax error in content "${$content}", it's referring to an unknown sub-node "${subnode_id}"!`)

		let sub_state = walk($subnode, callbacks, {
			$parent_node: $node,
			$id: subnode_id,
			depth: depth + 1,
		})

		sub_state = $filters.reduce(
			(state, $filter) => {
				const fine_filter_cb = `on_filter_${$filter}`
				if (callbacks[fine_filter_cb])
					return callbacks[fine_filter_cb]({ state, $filter, $node, $filters, depth})
				return callbacks.on_filter({ state, $filter, $node, $filters, depth})
			},
			sub_state,
		)

		// TODO detect unused $subnodes?

		state = callbacks.on_concatenate_subnode({
			state,
			sub_state,
			id: subnode_id,
			$node: $subnode,
			$parent_node: $node,
			depth,
		})

		state = callbacks.on_concatenate_str({
			state,
			str: split2[0],
			$node,
			depth,
		})

		return state
	}, state)

	return state
}

function walk($raw_node, callbacks, { $parent_node, $parent_classes, depth = 0, $id = 'root' } = {}) {
	const {
		$v = 1,
		$type = 'span',
		$classes = [],
		$content,
		...$subnodes
	} = $raw_node

	// TODO validation
	if ($v !== 1)
		throw new Error(`${LIB}: unknown schema version "${$v}"!`)

	const $node = {
		$v,
		$type,
		$classes,
		$content,
		...$subnodes,
		$sub_node_count: Object.keys($subnodes).length,
	}

	const isRoot = !$parent_node
	if (isRoot) {
		callbacks = {
			...DEFAULT_CALLBACKS,
			...callbacks,
		}
		callbacks.begin()
	}

	let state = callbacks.on_node_enter({ $node, $id, depth })

	// TODO class begin / start ?

	state = $classes.reduce(
		(state, $class) => callbacks.on_class_before({ state, $class, $node, depth }),
		state
	)

	if ($type === 'ul' || $type === 'ol') {
		const sorted_keys = Object.keys($subnodes).sort()
		sorted_keys.forEach(key => {
			const $subnode = {
				$type: 'li',
				$content: `{{${key}}}`,
				[key]: $subnodes[key]
			}
			let sub_state = walk($subnode, callbacks, {
				$parent_node: $node,
				$id: key,
				depth: depth + 1,
			})
			state = callbacks.on_concatenate_subnode({
				state,
				sub_state,
				id: key,
				$node: $subnode,
				$parent_node: $node,
				depth,
			})
		})
	}
	else
		state = walk_content({state, $content, $subnodes, callbacks, $node, depth })

	state = $classes.reduce(
		(state, $class) => callbacks.on_class_after({ state, $class, $node, depth }),
		state
	)

	const fine_type_cb = `on_type_${$type}`
	if (callbacks[fine_type_cb])
		state = callbacks[fine_type_cb]({ state, $type, $node, depth })
	else
		state = callbacks.on_type({ state, $type, $node, depth })

	state = callbacks.on_node_exit({state, $node, $id, depth})

	if (!$parent_node)
		callbacks.end()

	return state
}

module.exports = {
	walk,
}
