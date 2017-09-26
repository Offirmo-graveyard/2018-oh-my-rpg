import { KeySequence, ActionCallback, Action, Mode } from './types';
interface Options {
    initial_mode: Mode<any>;
    get_actions_for_mode(mode: Mode<any>): Promise<Action[]>;
    display_message(msg: string): Promise<void>;
    display_possible_actions_and_wait_for_one(actions: Action[]): Promise<void>;
}
interface Chat {
    start: () => Promise<void>;
}
declare function factory(o: Options): Chat;
export { KeySequence, ActionCallback, Action, Mode, Options, Chat, factory };
