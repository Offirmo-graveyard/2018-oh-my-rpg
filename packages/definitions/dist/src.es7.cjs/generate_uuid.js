"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid = require("nanoid");
///////
function generate_uuid(length = 21) {
    return 'uu1' + nanoid(length);
}
exports.generate_uuid = generate_uuid;
/////////////////////
//# sourceMappingURL=generate_uuid.js.map