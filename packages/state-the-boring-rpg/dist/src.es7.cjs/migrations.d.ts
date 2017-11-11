import { State } from './types';
declare function migrate_to_latest(legacy_state: any, hints?: any): State;
declare function migrate_to_1(legacy_state: any, hints: any): any;
export { migrate_to_1, migrate_to_latest };
