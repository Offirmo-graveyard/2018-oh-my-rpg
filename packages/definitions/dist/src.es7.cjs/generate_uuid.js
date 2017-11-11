"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid = require("nanoid");
///////
const UUID_RADIX = 'uu1';
const NANOID_LENGTH_FOR_1BTH_COLLISION_CHANCES = 21; // according to the doc
const UUID_LENGTH = UUID_RADIX.length + NANOID_LENGTH_FOR_1BTH_COLLISION_CHANCES;
exports.UUID_LENGTH = UUID_LENGTH;
function generate_uuid(length = NANOID_LENGTH_FOR_1BTH_COLLISION_CHANCES) {
    return UUID_RADIX + nanoid(length);
}
exports.generate_uuid = generate_uuid;
/////////////////////
//# sourceMappingURL=generate_uuid.js.map