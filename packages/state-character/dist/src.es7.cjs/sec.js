"use strict";
// safe-execution-context declarations
Object.defineProperty(exports, "__esModule", { value: true });
const safe_execution_context = require("@offirmo/safe-execution-context");
const consts_1 = require("./consts");
function getSEC(SEC) {
    const enforce_immutability = (state) => state; // TODO move up
    //const enforce_immutability = (state: State) => deepFreeze(state)
    return safe_execution_context.isomorphic.create({
        parent: SEC,
        module: consts_1.LIB_ID,
        context: {
            enforce_immutability,
        },
    });
}
exports.getSEC = getSEC;
//# sourceMappingURL=sec.js.map