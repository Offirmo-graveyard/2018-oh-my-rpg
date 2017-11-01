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
)
type NodeType = Enum<typeof NodeType>


interface CheckedNode {
	$v: number
	$type: NodeType
	$classes: string[]
	$content: string
	$sub: {
		[id: string]: Partial<CheckedNode>
	}
}

type Node = Partial<CheckedNode>

///////

// aliases
type Document = Node
//type RichTextDoc = Node

////////////

export {
	NodeType,
	CheckedNode,
	Node,

	Document,
}
