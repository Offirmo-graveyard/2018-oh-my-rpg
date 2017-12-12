"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const lodash_1 = require("lodash");
const deepFreeze = require("deep-freeze-strict");
const consts_1 = require("./consts");
const migrations_1 = require("./migrations");
const sec_1 = require("./sec");
const state_1 = require("./state");
const DATA_v0 = state_1.OLDEST_LEGACY_STATE_FOR_TESTS;
const DATA_OLDEST = DATA_v0;
const DATA_v1_20171025 = deepFreeze({
    meta: {
        uuid: 'uu1dgqu3h0FydqWyQ~6cYv3g',
        name: 'Offirmo',
        email: 'offirmo.net@gmail.com',
        allow_telemetry: false
    },
    avatar: {
        name: 'Perte',
        klass: 'paladin',
        characteristics: {
            level: 13,
            health: 12,
            mana: 23,
            strength: 4,
            agility: 5,
            charisma: 6,
            wisdom: 7,
            luck: 8
        }
    },
    inventory: {
        unslotted_capacity: 20,
        slotted: {
            armor: {
                slot: 'armor',
                base_hid: 'belt',
                qualifier1_hid: 'brass',
                qualifier2_hid: 'apprentice',
                quality: 'legendary',
                base_strength: 19,
                enhancement_level: 8,
            },
            weapon: {
                slot: 'weapon',
                base_hid: 'axe',
                qualifier1_hid: 'admirable',
                qualifier2_hid: 'adjudicator',
                quality: 'uncommon',
                base_strength: 2,
                enhancement_level: 0,
            },
        },
        unslotted: [
            {
                slot: 'weapon',
                base_hid: 'bow',
                qualifier1_hid: 'arcanic',
                qualifier2_hid: 'ambassador',
                quality: 'legendary',
                base_strength: 19,
                enhancement_level: 8,
            },
            {
                slot: 'armor',
                base_hid: 'armguards',
                qualifier1_hid: 'bone',
                qualifier2_hid: 'ancients',
                quality: 'uncommon',
                base_strength: 2,
                enhancement_level: 0,
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ]
    },
    wallet: {
        coin_count: 23456,
        token_count: 89,
    },
    prng: {
        seed: 1234,
        use_count: 107,
    },
    last_adventure: {
        hid: 'fight_lost_any',
        good: true,
        encounter: { name: 'chicken', level: 7, rank: 'elite', possible_emoji: '🐓' },
        gains: {
            level: 0,
            health: 0,
            mana: 0,
            strength: 0,
            agility: 0,
            charisma: 0,
            wisdom: 0,
            luck: 1,
            coins: 0,
            tokens: 0,
            armor: null,
            weapon: null,
            armor_improvement: false,
            weapon_improvement: false,
        }
    },
    click_count: 86,
    good_click_count: 86,
    meaningful_interaction_count: 86,
    schema_version: 1,
    revision: 0,
});
const DATA_v2_20171026 = {
    "schema_version": 2,
    "revision": 203,
    "meta": {
        "schema_version": 1,
        "revision": 5,
        "uuid": "uu1dgqu3h0FydqWyQ~6cYv3g",
        "name": "Offirmo",
        "email": "offirmo.net@gmail.com",
        "allow_telemetry": false
    },
    "avatar": {
        "schema_version": 2,
        "revision": 42,
        "name": "Perte",
        "klass": "paladin",
        "attributes": {
            "level": 13,
            "health": 12,
            "mana": 23,
            "strength": 4,
            "agility": 5,
            "charisma": 6,
            "wisdom": 7,
            "luck": 8
        }
    },
    "inventory": {
        "schema_version": 1,
        "revision": 42,
        "unslotted_capacity": 20,
        "slotted": {
            "armor": {
                "slot": "armor",
                "base_hid": "belt",
                "qualifier1_hid": "brass",
                "qualifier2_hid": "apprentice",
                "quality": "legendary",
                "base_strength": 19,
                "enhancement_level": 8
            },
            "weapon": {
                "slot": "weapon",
                "base_hid": "axe",
                "qualifier1_hid": "admirable",
                "qualifier2_hid": "adjudicator",
                "quality": "uncommon",
                "base_strength": 2,
                "enhancement_level": 0
            }
        },
        "unslotted": [
            {
                "slot": "weapon",
                "base_hid": "bow",
                "qualifier1_hid": "arcanic",
                "qualifier2_hid": "ambassador",
                "quality": "legendary",
                "base_strength": 19,
                "enhancement_level": 8
            },
            {
                "slot": "armor",
                "base_hid": "armguards",
                "qualifier1_hid": "bone",
                "qualifier2_hid": "ancients",
                "quality": "uncommon",
                "base_strength": 2,
                "enhancement_level": 0
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ]
    },
    "wallet": {
        "schema_version": 1,
        "revision": 42,
        "coin_count": 23456,
        "token_count": 89
    },
    "prng": {
        "schema_version": 1,
        "revision": 108,
        "seed": 1234,
        "use_count": 107
    },
    "last_adventure": {
        "hid": "fight_lost_any",
        "good": true,
        "encounter": {
            "name": "chicken",
            "level": 7,
            "rank": "elite",
            "possible_emoji": "🐓"
        },
        "gains": {
            "level": 0,
            "health": 0,
            "mana": 0,
            "strength": 0,
            "agility": 0,
            "charisma": 0,
            "wisdom": 0,
            "luck": 1,
            "coins": 0,
            "tokens": 0,
            "armor": null,
            "weapon": null,
            "armor_improvement": false,
            "weapon_improvement": false
        }
    },
    "click_count": 86,
    "good_click_count": 86,
    "meaningful_interaction_count": 86
};
const DATA_v3_20171108 = {
    "schema_version": 3,
    "revision": 203,
    "meta": {
        "schema_version": 1,
        "revision": 5,
        "uuid": "uu1dgqu3h0FydqWyQ~6cYv3g",
        "name": "Offirmo",
        "email": "offirmo.net@gmail.com",
        "allow_telemetry": false
    },
    "avatar": {
        "schema_version": 2,
        "revision": 42,
        "name": "Perte",
        "klass": "paladin",
        "attributes": {
            "level": 13,
            "health": 12,
            "mana": 23,
            "strength": 4,
            "agility": 5,
            "charisma": 6,
            "wisdom": 7,
            "luck": 8
        }
    },
    "inventory": {
        "schema_version": 1,
        "revision": 42,
        "unslotted_capacity": 20,
        "slotted": {
            "armor": {
                "slot": "armor",
                "base_hid": "belt",
                "qualifier1_hid": "brass",
                "qualifier2_hid": "apprentice",
                "quality": "legendary",
                "base_strength": 19,
                "enhancement_level": 8
            },
            "weapon": {
                "slot": "weapon",
                "base_hid": "axe",
                "qualifier1_hid": "admirable",
                "qualifier2_hid": "adjudicator",
                "quality": "uncommon",
                "base_strength": 2,
                "enhancement_level": 0
            }
        },
        "unslotted": [
            {
                "slot": "weapon",
                "base_hid": "bow",
                "qualifier1_hid": "arcanic",
                "qualifier2_hid": "ambassador",
                "quality": "legendary",
                "base_strength": 19,
                "enhancement_level": 8
            },
            {
                "slot": "armor",
                "base_hid": "armguards",
                "qualifier1_hid": "bone",
                "qualifier2_hid": "ancients",
                "quality": "uncommon",
                "base_strength": 2,
                "enhancement_level": 0
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ]
    },
    "wallet": {
        "schema_version": 1,
        "revision": 42,
        "coin_count": 23456,
        "token_count": 89
    },
    "prng": {
        "schema_version": 1,
        "revision": 108,
        "seed": 1234,
        "use_count": 107
    },
    "last_adventure": {
        "hid": "fight_lost_any",
        "uuid": "uu1de1~EVAdXlW5_p23Ro4OH",
        "good": true,
        "encounter": {
            "name": "chicken",
            "level": 7,
            "rank": "elite",
            "possible_emoji": "🐓"
        },
        "gains": {
            "level": 0,
            "health": 0,
            "mana": 0,
            "strength": 0,
            "agility": 0,
            "charisma": 0,
            "wisdom": 0,
            "luck": 1,
            "coin": 0,
            "token": 0,
            "armor": null,
            "weapon": null,
            "armor_improvement": false,
            "weapon_improvement": false
        }
    },
    "click_count": 86,
    "good_click_count": 86,
    "meaningful_interaction_count": 86
};
//console.log(JSON.stringify(DEMO_STATE, null, 2))
const DATA_LATEST = state_1.DEMO_STATE;
describe('⚔ 👑 😪  The Boring RPG - schema migration', function () {
    context('when the version is more recent', function () {
        it('should throw with a meaningful error', () => {
            function load() {
                migrations_1.migrate_to_latest(sec_1.get_SEC(), { schema_version: 99999 });
            }
            chai_1.expect(load).to.throw('more recent version');
        });
    });
    context('when the version is up to date', function () {
        it('should return the state without change', () => {
            chai_1.expect(DATA_LATEST.schema_version).to.equal(consts_1.SCHEMA_VERSION); // make sure our tests are up to date
            chai_1.expect(migrations_1.migrate_to_latest(sec_1.get_SEC(), lodash_1.cloneDeep(DATA_LATEST))).to.deep.equal(DATA_LATEST);
        });
    });
    context('when the version is outdated', function () {
        it('should migrate to latest version', () => {
            chai_1.expect(migrations_1.migrate_to_latest(sec_1.get_SEC(), lodash_1.cloneDeep(DATA_OLDEST), state_1.MIGRATION_HINTS_FOR_TESTS)).to.deep.equal(DATA_LATEST);
        });
    });
    describe('individual migration functions', function () {
        describe(`3 to latest`, function () {
            it('should work', () => {
                chai_1.expect(migrations_1.migrate_to_latest(sec_1.get_SEC(), lodash_1.cloneDeep(DATA_v3_20171108), state_1.MIGRATION_HINTS_FOR_TESTS)).to.deep.equal(DATA_LATEST);
            });
        });
        describe(`2 to latest`, function () {
            it('should work', () => {
                chai_1.expect(migrations_1.migrate_to_latest(sec_1.get_SEC(), lodash_1.cloneDeep(DATA_v2_20171026), state_1.MIGRATION_HINTS_FOR_TESTS)).to.deep.equal(DATA_LATEST);
            });
        });
        describe(`1 to latest`, function () {
            it('should work', () => {
                chai_1.expect(migrations_1.migrate_to_latest(sec_1.get_SEC(), lodash_1.cloneDeep(DATA_v1_20171025), state_1.MIGRATION_HINTS_FOR_TESTS)).to.deep.equal(DATA_LATEST);
            });
        });
        describe(`0 to latest`, function () {
            it('should work', () => {
                chai_1.expect(migrations_1.migrate_to_latest(sec_1.get_SEC(), lodash_1.cloneDeep(DATA_v0), state_1.MIGRATION_HINTS_FOR_TESTS)).to.deep.equal(DATA_LATEST);
            });
        });
    });
});
//# sourceMappingURL=migrations_spec.js.map