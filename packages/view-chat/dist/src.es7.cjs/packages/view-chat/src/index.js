"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
function factory(o) {
    async function start() {
        let mode = o.initial_mode;
        await o.display_message(mode.recap_message);
        let actions = await o.get_actions_for_mode(mode);
        await o.display_possible_actions_and_wait_for_one(actions);
    }
    return {
        start,
    };
}
exports.factory = factory;
/////////////////////
//# sourceMappingURL=index.js.map