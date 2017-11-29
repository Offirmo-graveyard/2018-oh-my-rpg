import { State } from './types';
declare type SafeExecutionContext = any;
interface BaseSECContext {
    SEC: SafeExecutionContext;
    logger: any;
}
interface SECContext extends BaseSECContext {
    enforce_immutability: (state: State) => State;
}
declare function getSEC(SEC?: SafeExecutionContext): SafeExecutionContext;
export { SafeExecutionContext, BaseSECContext, SECContext, getSEC };
