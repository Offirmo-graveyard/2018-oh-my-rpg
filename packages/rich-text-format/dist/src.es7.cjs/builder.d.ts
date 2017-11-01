import { NodeType, Node, Document } from './types';
interface Builder {
    addClass(klass: string): Builder;
    pushText(str: string): Builder;
    pushStrong(str: string, id?: string): Builder;
    pushEmphasized(str: string, id?: string): Builder;
    pushNode(node: Node, id?: string): Builder;
    pushLineBreak(): Builder;
    pushHorizontalRule(): Builder;
    done(): Document;
}
declare function factory($type: NodeType): Builder;
declare function paragraph(): Builder;
declare function span(): Builder;
declare function ordered_list(): Builder;
declare function unordered_list(): Builder;
export { NodeType, Document, Builder, factory, paragraph, span, ordered_list, unordered_list };
