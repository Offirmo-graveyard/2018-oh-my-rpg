import { Node } from './types';
declare function to_text($doc: Node): string;
declare function to_html($doc: Node): string;
export * from './types';
export * from './walk';
export { to_text, to_html };
