"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const definitions_1 = require("@oh-my-rpg/definitions");
const MetaState = require("@oh-my-rpg/state-meta");
const CharacterState = require("@oh-my-rpg/state-character");
const WalletState = require("@oh-my-rpg/state-wallet");
const InventoryState = require("@oh-my-rpg/state-inventory");
const PRNGState = require("@oh-my-rpg/state-prng");
const consts_1 = require("./consts");
const state_1 = require("./state");
const sec_1 = require("./sec");
/////////////////////
function migrate_to_latest(SEC, legacy_state, hints = {}) {
    return sec_1.get_SEC(SEC).xTry('migrate_to_latest', ({ SEC, logger }) => {
        const src_version = (legacy_state && legacy_state.schema_version) || 0;
        let state = state_1.create();
        if (!legacy_state || Object.keys(legacy_state).length === 0) {
            // = empty or empty object (happen, with some deserialization techniques)
            // It's a new state, keep the freshly created one.
        }
        else if (src_version === consts_1.SCHEMA_VERSION)
            state = legacy_state;
        else if (src_version > consts_1.SCHEMA_VERSION)
            throw new Error(`Your data is from a more recent version of this lib. Please update!`);
        else {
            try {
                // TODO logger
                console.warn(`${consts_1.LIB_ID}: attempting to migrate schema from v${src_version} to v${consts_1.SCHEMA_VERSION}:`);
                state = migrate_to_3(SEC, legacy_state, hints);
                console.info(`${consts_1.LIB_ID}: schema migration successful.`);
            }
            catch (err) {
                // failed, reset all
                // TODO send event upwards
                console.error(`${consts_1.LIB_ID}: failed migrating schema, performing full reset !`, err);
                state = state_1.create();
            }
        }
        // migrate sub-reducers if any...
        state.meta = MetaState.migrate_to_latest(state.meta, hints.meta);
        state.avatar = CharacterState.migrate_to_latest(SEC, state.avatar, hints.avatar);
        state.inventory = InventoryState.migrate_to_latest(state.inventory, hints.inventory);
        state.wallet = WalletState.migrate_to_latest(state.wallet, hints.wallet);
        state.prng = PRNGState.migrate_to_latest(state.prng, hints.prng);
        return state;
    });
}
exports.migrate_to_latest = migrate_to_latest;
/////////////////////
function migrate_to_3(SEC, legacy_state, hints) {
    return SEC.xTry('migrate_to_3', ({ SEC, logger }) => {
        if (legacy_state.schema_version !== 2)
            legacy_state = migrate_to_2(SEC, legacy_state, hints);
        logger.info(`${consts_1.LIB_ID}: migrating schema from v${legacy_state.schema_version} to v${legacy_state.schema_version + 1}…`);
        const { last_adventure } = legacy_state;
        if (last_adventure) {
            // renamed fieldsg
            last_adventure.gains.coin = last_adventure.gains.coins;
            delete last_adventure.gains.coins;
            last_adventure.gains.token = last_adventure.gains.tokens;
            delete last_adventure.gains.tokens;
            // new fields
            last_adventure.uuid = last_adventure.uuid || (hints && hints.to_v3 && hints.to_v3.last_adventure_uuid) || definitions_1.generate_uuid();
        }
        return Object.assign({}, legacy_state, { last_adventure, schema_version: 3 });
    });
}
/////////////////////
function migrate_to_2(SEC, legacy_state, hints) {
    return SEC.xTry('migrate_to_2', ({ SEC, logger }) => {
        if (legacy_state.schema_version !== 1)
            legacy_state = migrate_to_1(SEC, legacy_state, hints);
        logger.info(`${consts_1.LIB_ID}: migrating schema from v1 to v2...`);
        return Object.assign({}, legacy_state, { schema_version: 2, revision: (hints && hints.to_v2 && hints.to_v2.revision) || 0 });
    });
}
/////////////////////
function migrate_to_1(SEC, legacy_state, hints) {
    return SEC.xTry('migrate_to_1', ({ logger }) => {
        if (Object.keys(legacy_state).length !== Object.keys(state_1.OLDEST_LEGACY_STATE_FOR_TESTS).length)
            throw new Error(`Unrecognized schema, most likely too old, can't migrate!`);
        logger.info(`${consts_1.LIB_ID}: migrating schema from v0/non-versioned to v1...`);
        return Object.assign({}, legacy_state, { schema_version: 1, revision: (hints && hints.to_v1 && hints.to_v1.revision) || 0 });
    });
}
exports.migrate_to_1 = migrate_to_1;
//# sourceMappingURL=migrations.js.map