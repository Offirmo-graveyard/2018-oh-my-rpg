"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe('💬  view as a chat', function () {
    it('should work with a basic example', () => {
        this.timeout(1000 * 1000);
        function get_initial_mode() {
            return {
                recap_message: 'Welcome to TBRPG!'
            };
        }
        async function get_actions_for_mode(mode) {
            let actions = [
                {
                    call_to_action: 'Quit',
                    rank: 999,
                    command: {
                        key_sequence: { ctrl: true, meta: false, shift: false, name: 'c' }
                    },
                    callback: () => Promise.resolve()
                },
            ];
            return [
                {
                    call_to_action: 'Play',
                    command: {
                        text_short: 'p'
                    },
                    callback: () => Promise.resolve()
                },
                {
                    call_to_action: 'Inventory',
                    command: {
                        text_short: 'i'
                    },
                    callback: () => Promise.resolve()
                },
                {
                    call_to_action: 'Character sheet',
                    command: {
                        text_short: 'i'
                    },
                    callback: () => Promise.resolve()
                },
                {
                    call_to_action: 'Quit',
                    command: {
                        key_sequence: { ctrl: false, meta: false, shift: false, name: 'p' }
                    },
                    callback: () => Promise.resolve()
                },
            ];
        }
        async function display_message(msg) {
            console.log('->' + msg);
        }
        async function display_possible_actions(actions) {
            console.log('Possible actions:');
            actions.forEach(action => {
                console.log('- ' + action.call_to_action);
            });
        }
        const options = {
            initial_mode: get_initial_mode(),
            get_actions_for_mode,
            display_message,
            display_possible_actions_and_wait_for_one: display_possible_actions,
        };
        const chat = _1.factory(options);
        return chat.start();
    });
});
//# sourceMappingURL=index_spec.js.map