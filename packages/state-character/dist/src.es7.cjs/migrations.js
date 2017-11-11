"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
const state_1 = require("./state");
/////////////////////
function migrate_to_latest(legacy_state, hints = {}) {
    const src_version = legacy_state.schema_version || 0;
    let state = state_1.create();
    if (src_version === consts_1.SCHEMA_VERSION)
        state = legacy_state;
    else if (src_version > consts_1.SCHEMA_VERSION)
        throw new Error(`${consts_1.LIB_ID}: Your data is from a more recent version of this lib. Please update!`);
    else {
        try {
            // TODO logger
            console.warn(`${consts_1.LIB_ID}: attempting to migrate schema from v${src_version} to v${consts_1.SCHEMA_VERSION}:`);
            state = migrate_to_2(legacy_state, hints);
            console.info(`${consts_1.LIB_ID}: schema migration successful.`);
        }
        catch (e) {
            // failed, reset all
            // TODO send event upwards
            console.error(`${consts_1.LIB_ID}: failed migrating schema, performing full reset !`);
            state = state_1.create();
        }
    }
    // migrate sub-reducers if any...
    return state;
}
exports.migrate_to_latest = migrate_to_latest;
/////////////////////
function migrate_to_2(legacy_state, hints) {
    if (legacy_state.schema_version !== 1)
        legacy_state = migrate_to_1(legacy_state, hints);
    console.info(`${consts_1.LIB_ID}: migrating schema from v1 to v2...`);
    return Object.assign({}, legacy_state, { schema_version: 2, revision: (hints && hints.to_v2 && hints.to_v2.revision) || 0 });
}
/////////////////////
function migrate_to_1(legacy_state, hints) {
    if (legacy_state.hasOwnProperty('characteristics')) {
        console.info(`${consts_1.LIB_ID}: migrating schema from v0/non-versioned to v1...`);
        const { name, klass, characteristics } = legacy_state;
        return {
            name,
            klass,
            attributes: characteristics,
            schema_version: 1,
        };
    }
    throw new Error(`Unrecognized schema, most likely too old, can't migrate!`);
}
//# sourceMappingURL=migrations.js.map