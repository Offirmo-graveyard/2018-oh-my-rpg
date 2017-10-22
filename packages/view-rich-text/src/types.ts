import { Enum } from 'typescript-string-enums'

const NodeType = Enum(
	'span',
	'p',
	'br',
	'hr',
	'ol',
	'ul',
)
type NodeType = Enum<typeof NodeType>



interface Node {
	$v: number
	$type: NodeType
	$classes: string[]
	$content: string
	[sub_node_id: string]: any // but in fact Node
}

type RawNode = Partial<Node>



export {
	NodeType,
	Node,
	RawNode,
}
