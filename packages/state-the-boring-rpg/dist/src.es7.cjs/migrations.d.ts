import { State } from './types';
import { SoftExecutionContext } from './sec';
declare function migrate_to_latest(SEC: SoftExecutionContext, legacy_state: any, hints?: any): State;
declare function migrate_to_1(SEC: SoftExecutionContext, legacy_state: any, hints: any): any;
export { migrate_to_1, migrate_to_latest };
