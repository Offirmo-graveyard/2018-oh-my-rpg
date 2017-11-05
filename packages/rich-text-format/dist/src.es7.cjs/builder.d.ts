import { NodeType, CheckedNode, Node, Document } from './types';
interface Builder {
    addClass(...classes: string[]): Builder;
    pushText(str: string): Builder;
    pushStrong(str: string, id?: string): Builder;
    pushEmphasized(str: string, id?: string): Builder;
    pushRawNode(node: Node, id?: string): Builder;
    pushNode(node: Node, id?: string): Builder;
    pushLineBreak(): Builder;
    pushHorizontalRule(): Builder;
    done(): CheckedNode;
}
declare function factory($type: NodeType): Builder;
declare function section(): Builder;
declare function heading(): Builder;
declare function paragraph(): Builder;
declare function span(): Builder;
declare function ordered_list(): Builder;
declare function unordered_list(): Builder;
export { NodeType, Document, Builder, factory, section, heading, paragraph, span, ordered_list, unordered_list };
