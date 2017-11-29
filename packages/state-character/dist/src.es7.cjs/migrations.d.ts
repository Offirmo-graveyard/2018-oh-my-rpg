import { State } from './types';
import { SafeExecutionContext } from './sec';
declare function migrate_to_latest(SEC: SafeExecutionContext, legacy_state: any, hints?: any): State;
export { migrate_to_latest };
