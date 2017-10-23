"use strict";

const { prettify_json } = require('./libs')

/*console.log(prettify_json({
     $v,
     $type,
     $classes,
     $content,
     $subnodes,
 }))*/

const MANY_SPACES = '                                 '

function indent(n) {
	return MANY_SPACES.slice(0, n * 2)
}

function debug_node_short($node) {
	const { $type, $content } = $node

	return `${$type}."${$content}"`
}

module.exports = {
	begin: () => console.log('⟩ [begin]'),
	end: () => console.log('⟨ [end]'),
	on_node_enter: ({$node, $id, depth}) => {
		console.log(indent(depth) + `⟩ [node] #${$id} ` + debug_node_short($node))
		const state = ''
		console.log(indent(depth) + `  [state="${state}"] after`)
		return state
	},
	on_node_exit: ({state, $node, $id, depth}) => {
		console.log(indent(depth) + `⟨ [node] #${$id} [state="${state}"]`)
		return state
	},
	on_concatenate_str: ({state, str, $node, depth}) => {
		console.log(indent(depth) + `+ [content=str] "${str}"`)
		console.log(indent(depth) + `  [state="${state}"] before`)
		state = state + str
		console.log(indent(depth) + `  [state="${state}"] after`)
		return state
	},
	on_concatenate_subnode: ({state, sub_state, $node, depth}) => {
		console.log(indent(depth) + `+ [content=node] "${sub_state}"`)
		console.log(indent(depth) + `  [state="${state}"] before`)
		state = state + sub_state
		console.log(indent(depth) + `  [state="${state}"] after`)
		return state
	},
	on_subnode_id: ({state, id, $node, depth}) => {
		console.log(indent(depth) + `  [sub-node] #${id}`)
		console.log(indent(depth) + `  [state="${state}"]`)
		return state
	},
	on_filter: ({state, $filter, sub_state, depth }) => {
		console.log(indent(depth) + `  [filter] "${$filter}" on "${sub_state}"`)
		console.log(indent(depth) + `  [state="${state}"]`)
		return state
	},
	on_class_before: ({state, $class, $node, depth }) => {
		console.log(indent(depth) + `  [⟩class] .${$class}`)
		console.log(indent(depth) + `  [state="${state}"]`)
		return state
	},
	on_class_after: ({state, $class, $node, depth }) => {
		console.log(indent(depth) + `  [⟨class] .${$class}`)
		console.log(indent(depth) + `  [state="${state}"]`)
		return state
	},
	on_type: ({state, $type, $node, depth}) => {
		console.log(indent(depth) + `  [type] "${$type}" ${$node.$classes}`)
		console.log(indent(depth) + `  [state="${state}"]`)
		return state
	},
}
