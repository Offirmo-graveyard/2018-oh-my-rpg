declare type ActionCallback = () => Promise<void>;
interface KeySequence {
    ctrl: boolean;
    meta: boolean;
    shift: boolean;
    name: string;
}
interface Action {
    rank?: number;
    call_to_action: string;
    command?: {
        text_full?: string;
        text_short?: string;
        key_sequence?: KeySequence;
    };
    callback: ActionCallback;
}
interface Mode<State> {
    recap_message: string;
}
export { KeySequence, ActionCallback, Action, Mode };
