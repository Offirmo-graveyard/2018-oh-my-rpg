import { Enum } from 'typescript-string-enums';
declare const NodeType: {
    span: "span";
    p: "p";
    br: "br";
    hr: "hr";
    ol: "ol";
    ul: "ul";
};
declare type NodeType = Enum<typeof NodeType>;
interface Node {
    $v: number;
    $type: NodeType;
    $classes: string[];
    $content: string;
    [sub_node_id: string]: any;
}
declare type RawNode = Partial<Node>;
export { NodeType, Node, RawNode };
