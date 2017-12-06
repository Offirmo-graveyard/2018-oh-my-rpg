"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
exports.setRoot = core_1.setRoot;
function create(...args) {
    const SEC = core_1.create(...args);
    // TODO offer to hook setTimeout etc.
    //core.
    return SEC;
}
exports.create = create;
//# sourceMappingURL=index.js.map