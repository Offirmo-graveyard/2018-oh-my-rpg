import { Enum } from 'typescript-string-enums'

///////

const NodeType = Enum(
	'span',
	'p',
	'br',
	'hr',
	'ol',
	'ul',
	'li',
	'strong',
	'em',
	'section',
	'heading',
)
type NodeType = Enum<typeof NodeType>


interface CheckedNode {
	$v: number // schema version
	$type: NodeType
	$classes: string[]
	$content: string
	$sub: {
		[id: string]: Partial<CheckedNode>
	}
	// hints for some renderer. May or may not be used.
	$hints: {
		[k: string]: any
	}
}

type Node = Partial<CheckedNode>

///////

// aliases
type Document = Node

////////////

export {
	NodeType,
	CheckedNode,
	Node,

	Document,
}
