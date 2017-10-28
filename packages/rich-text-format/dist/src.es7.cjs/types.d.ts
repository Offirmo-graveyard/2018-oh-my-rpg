import { Enum } from 'typescript-string-enums';
declare const NodeType: {
    br: "br";
    hr: "hr";
    span: "span";
    p: "p";
    ol: "ol";
    ul: "ul";
    li: "li";
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
export { NodeType, CheckedNode, Node };
