import { CharacterStat, State } from './types';
declare function factory(): State;
declare function increase_stat(state: State, stat: CharacterStat, amount?: number): State;
export { CharacterStat, State, factory, increase_stat };
