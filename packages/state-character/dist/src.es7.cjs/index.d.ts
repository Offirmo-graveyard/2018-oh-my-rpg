import { CharacterStat, State } from './types';
declare const CHARACTER_STATS: string[];
declare function factory(): State;
declare function increase_stat(state: State, stat: CharacterStat, amount?: number): State;
export { CharacterStat, State, CHARACTER_STATS, factory, increase_stat };
