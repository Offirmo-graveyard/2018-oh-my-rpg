import { Enum } from 'typescript-string-enums';
declare const NodeType: {
    span: "span";
    p: "p";
    br: "br";
    hr: "hr";
    ol: "ol";
    ul: "ul";
    li: "li";
    strong: "strong";
    em: "em";
};
declare type NodeType = Enum<typeof NodeType>;
interface CheckedNode {
    $v: number;
    $type: NodeType;
    $classes: string[];
    $content: string;
    $sub: {
        [id: string]: Partial<CheckedNode>;
    };
}
declare type Node = Partial<CheckedNode>;
declare type Document = Node;
export { NodeType, CheckedNode, Node, Document };
