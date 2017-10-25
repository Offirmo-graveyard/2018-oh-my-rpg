"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const MetaState = require("@oh-my-rpg/state-meta");
const CharacterState = require("@oh-my-rpg/state-character");
const WalletState = require("@oh-my-rpg/state-wallet");
const InventoryState = require("@oh-my-rpg/state-inventory");
const PRNGState = require("@oh-my-rpg/state-prng");
const consts_1 = require("./consts");
const state_1 = require("./state");
/////////////////////
function migrate_to_latest(legacy_state, hints = {}) {
    const src_version = legacy_state.schema_version || 0;
    let state = state_1.factory();
    if (src_version === consts_1.SCHEMA_VERSION)
        state = legacy_state;
    else if (src_version > consts_1.SCHEMA_VERSION)
        throw new Error(`${consts_1.LIB_ID}: Your data is from a more recent version of this lib. Please update!`);
    else {
        // TODO logger
        console.warn(`${consts_1.LIB_ID}: attempting to migrate schema from v${src_version} to v${consts_1.SCHEMA_VERSION}:`);
        state = migrate_to_2(legacy_state, hints);
    }
    // migrate sub-reducers if any...
    state.meta = MetaState.migrate_to_latest(state.meta, hints.meta);
    state.avatar = CharacterState.migrate_to_latest(state.avatar, hints.avatar);
    state.inventory = InventoryState.migrate_to_latest(state.inventory, hints.inventory);
    state.wallet = WalletState.migrate_to_latest(state.wallet, hints.wallet);
    state.prng = PRNGState.migrate_to_latest(state.prng, hints.prng);
    // TODO migrate adventure
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
    console.info(`${consts_1.LIB_ID}: migrating schema from v0/non-versioned to v1...`);
    return Object.assign({}, legacy_state, { schema_version: 1, revision: (hints && hints.to_v1 && hints.to_v1.revision) || 0 });
}
exports.migrate_to_1 = migrate_to_1;
/////////////////////
function fail_migration_by_resetting() {
    // TODO send event upwards
    console.error(`${consts_1.LIB_ID}: failed migrating schema, performing full reset !`);
    return state_1.factory();
}
//# sourceMappingURL=migrations.js.map