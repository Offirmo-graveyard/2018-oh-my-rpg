import { CharMapping } from './types';
import { CHAR_MAPPINGS, CHAR_MAPPINGS_BY_ID } from './constants';
declare function map_string(m: CharMapping, str: string): string;
declare function apply_font(id: string, str: string): string;
interface Options {
}
declare function factory(options: Options): void;
export { CHAR_MAPPINGS, CHAR_MAPPINGS_BY_ID, CharMapping, map_string, apply_font, Options, factory };
