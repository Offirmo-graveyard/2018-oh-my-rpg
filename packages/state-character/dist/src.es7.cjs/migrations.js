"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
const index_1 = require("./index");
function migrate_to_latest(state) {
    const src_version = state.version;
    if (!state.version) {
        // no previous data
        return index_1.factory();
    }
    if (src_version === consts_1.SCHEMA_VERSION)
        return state;
    if (src_version > consts_1.SCHEMA_VERSION)
        throw new Error(`${consts_1.LIB_ID}: You saved game was is from a more recent version of this game. Please update!`);
    // TODO logger
    console.warn(`${consts_1.LIB_ID}: attempting to migrate schema from v${src_version} to v${consts_1.SCHEMA_VERSION}...`);
    return migrate_to_1(state);
}
exports.migrate_to_latest = migrate_to_latest;
function migrate_to_1(legacy_state) {
    // TODO improve for cascade
    if (legacy_state.hasOwnProperty('characteristics')) {
        console.info(`${consts_1.LIB_ID}: migrating schema from (non versioned) to v1...`);
        const { name, klass, characteristics } = legacy_state;
        return {
            name,
            klass,
            attributes: characteristics,
            schema_version: 1,
        };
    }
    return fail_migration_by_resetting();
}
function fail_migration_by_resetting() {
    // TODO send event upwards
    console.error(`${consts_1.LIB_ID}: failed migrating, performing full reset !`);
    return index_1.factory();
}
//# sourceMappingURL=migrations.js.map