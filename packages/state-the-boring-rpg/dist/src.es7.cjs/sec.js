"use strict";
// safe-execution-context declarations
Object.defineProperty(exports, "__esModule", { value: true });
const soft_execution_context = require("@offirmo/soft-execution-context");
const consts_1 = require("./consts");
function get_SEC(SEC) {
    const enforce_immutability = (state) => state; // TODO move up
    //const enforce_immutability = (state: State) => deepFreeze(state)
    return soft_execution_context.isomorphic.create({
        parent: SEC,
        module: consts_1.LIB_ID,
        context: {
            enforce_immutability,
        },
    });
}
exports.get_SEC = get_SEC;
//# sourceMappingURL=sec.js.map