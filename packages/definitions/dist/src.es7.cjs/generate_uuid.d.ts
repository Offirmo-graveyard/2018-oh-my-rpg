import { UUID } from './types';
declare const UUID_LENGTH: number;
declare function generate_uuid(length?: number): UUID;
export { UUID_LENGTH, generate_uuid };
