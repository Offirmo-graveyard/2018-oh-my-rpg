"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4 = require("uuid/v4");
const deepFreeze = require("deep-freeze-strict");
const consts_1 = require("./consts");
/////////////////////
const DEFAULT_NAME = 'anonymous';
exports.DEFAULT_NAME = DEFAULT_NAME;
///////
function factory() {
    return {
        schema_version: consts_1.SCHEMA_VERSION,
        revision: 0,
        uuid: uuidv4(),
        name: DEFAULT_NAME,
        email: null,
        allow_telemetry: true,
    };
}
exports.factory = factory;
/////////////////////
function rename(state, new_name) {
    if (!new_name)
        throw new Error(`Error while renaming to "${new_name}: invalid value!`);
    state.name = new_name;
    return state;
}
exports.rename = rename;
function set_email(state, email) {
    if (!email)
        throw new Error(`Error while setting mail to "${email}: invalid value!`);
    state.email = email;
    return state;
}
exports.set_email = set_email;
/////////////////////
// needed to test migrations, both here and in composing parents
// a full featured, non-trivial demo state
// needed for demos
const DEMO_STATE = deepFreeze({
    schema_version: 1,
    revision: 5,
    uuid: 'd4759a75-81a2-4730-a0ef-79c7d0356ee8',
    name: 'Offirmo',
    email: 'offirmo.net@gmail.com',
    allow_telemetry: false,
});
exports.DEMO_STATE = DEMO_STATE;
// the oldest format we can migrate from
// must correspond to state above
const OLDEST_LEGACY_STATE_FOR_TESTS = deepFreeze({
    // no schema_version = 0
    uuid: 'd4759a75-81a2-4730-a0ef-79c7d0356ee8',
    name: 'Offirmo',
    email: 'offirmo.net@gmail.com',
    allow_telemetry: false,
});
exports.OLDEST_LEGACY_STATE_FOR_TESTS = OLDEST_LEGACY_STATE_FOR_TESTS;
// some hints may be needed to migrate to demo state
const MIGRATION_HINTS_FOR_TESTS = deepFreeze({
    to_v1: {
        revision: 5
    },
});
exports.MIGRATION_HINTS_FOR_TESTS = MIGRATION_HINTS_FOR_TESTS;
/////////////////////
//# sourceMappingURL=state.js.map