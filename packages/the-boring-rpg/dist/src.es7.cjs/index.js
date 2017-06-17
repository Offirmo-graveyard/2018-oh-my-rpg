"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const definitions_1 = require("@oh-my-rpg/definitions");
const state_inventory_1 = require("@oh-my-rpg/state-inventory");
const state_prng_1 = require("@oh-my-rpg/state-prng");
const logic_weapons_1 = require("@oh-my-rpg/logic-weapons");
const logic_armors_1 = require("@oh-my-rpg/logic-armors");
/////////////////////
function factory() {
    let state = {
        inventory: state_inventory_1.factory(),
        prng: state_prng_1.factory(),
    };
    let prng = state_prng_1.get_prng(state.prng);
    const start_weapon = logic_weapons_1.factory(prng, {
        base_hid: 'spoon',
        qualifier1_hid: 'used',
        qualifier2_hid: 'noob',
        quality: definitions_1.ItemQuality.common,
        base_strength: 1,
    });
    state = receive_item(state, start_weapon);
    state = equip_item(state, 0);
    const start_armor = logic_armors_1.factory(prng, {
        base_hid: 'socks',
        qualifier1_hid: 'used',
        qualifier2_hid: 'noob',
        quality: 'common',
    });
    state = receive_item(state, start_armor);
    state = equip_item(state, 0);
    //state.prng = prng_update_use_count(state.prng, prng)
    return state;
}
exports.factory = factory;
/////////////////////
function receive_item(state, item) {
    state.inventory = state_inventory_1.add_item(state.inventory, item);
    return state;
}
function equip_item(state, coordinates) {
    state.inventory = state_inventory_1.equip_item(state.inventory, coordinates);
    return state;
}
/////////////////////
function play(state) {
    // TODO
    return state;
}
function factory(rng, archetype) {
    const { hid, good } = archetype;
    const { agility, health, luck, mana, strength, vitality, wisdom, tokens } = archetype.post.gains;
    return {
        hid,
        good,
        gains: {
            level: number,
            health,
            mana,
            strength,
            agility,
            vitality,
            wisdom,
            luck,
            coins: number,
            tokens,
            weapon: null | Weapon,
            armor: null | Armor,
            improved_weapon_index: null | number,
            improved_armor_index: null | number
        }
    };
}
exports.factory = factory;
/////////////////////
// for demo purpose, all characteristics having the same probability + also random enhancement level
function generate_random_demo_adventure() {
    const rng = Random.engines.mt19937().autoSeed();
    const archetype = pick_random_archetype(rng);
    return factory(rng, archetype);
}
/////////////////////
//# sourceMappingURL=index.js.map