import { State } from './types';
declare type SoftExecutionContext = any;
interface BaseSECContext {
    SEC: SoftExecutionContext;
    logger: any;
}
interface SECContext extends BaseSECContext {
    enforce_immutability: (state: State) => State;
}
declare function get_SEC(SEC?: SoftExecutionContext): SoftExecutionContext;
export { SoftExecutionContext, BaseSECContext, SECContext, get_SEC };
