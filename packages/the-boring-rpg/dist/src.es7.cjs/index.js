"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/////////////////////
const definitions_1 = require("@oh-my-rpg/definitions");
const state_character_1 = require("@oh-my-rpg/state-character");
const state_inventory_1 = require("@oh-my-rpg/state-inventory");
const state_prng_1 = require("@oh-my-rpg/state-prng");
const logic_weapons_1 = require("@oh-my-rpg/logic-weapons");
const logic_armors_1 = require("@oh-my-rpg/logic-armors");
const logic_adventures_1 = require("@oh-my-rpg/logic-adventures");
/////////////////////
function factory() {
    let state = {
        characteristics: state_character_1.factory(),
        inventory: state_inventory_1.factory(),
        prng: state_prng_1.factory(),
        last_adventure: null,
    };
    let rng = state_prng_1.get_prng(state.prng);
    const start_weapon = logic_weapons_1.factory(rng, {
        base_hid: 'spoon',
        qualifier1_hid: 'used',
        qualifier2_hid: 'noob',
        quality: definitions_1.ItemQuality.common,
        base_strength: 1,
    });
    state = receive_item(state, start_weapon);
    state = equip_item(state, 0);
    const start_armor = logic_armors_1.factory(rng, {
        base_hid: 'socks',
        qualifier1_hid: 'used',
        qualifier2_hid: 'noob',
        quality: 'common',
        base_strength: 1,
    });
    state = receive_item(state, start_armor);
    state = equip_item(state, 0);
    //state.prng = prng_update_use_count(state.prng, rng)
    return state;
}
exports.factory = factory;
/////////////////////
function instantiate_adventure_archetype(rng, aa, player_level, inventory) {
    const { hid, good, post: { gains: { level: should_gain_a_level, agility, health, luck, mana, strength, vitality, wisdom, coins: coins_gain, tokens, armor: should_receive_armor, weapon: should_receive_weapon, armor_improvement: improved_armor, weapon_improvement: improved_weapon, } } } = aa;
    const new_player_level = player_level + (should_gain_a_level ? 1 : 0);
    const weapon = should_receive_weapon
        ? logic_weapons_1.factory(rng)
        : null;
    const armor = should_receive_armor
        ? logic_armors_1.factory(rng)
        : null;
    return {
        hid,
        good,
        gains: {
            level: should_gain_a_level ? 1 : 0,
            health,
            mana,
            strength,
            agility,
            vitality,
            wisdom,
            luck,
            coins: logic_adventures_1.generate_random_coin_gain(rng, coins_gain, new_player_level),
            tokens,
            weapon,
            armor,
            improved_weapon,
            improved_armor,
        }
    };
}
function generate_random_good_adventure(rng, player_level, inventory) {
    const aa = logic_adventures_1.pick_random_good_archetype(rng);
    return instantiate_adventure_archetype(rng, aa, player_level, inventory);
}
function receive_item(state, item) {
    // TODO handler inventory full
    state.inventory = state_inventory_1.add_item(state.inventory, item);
    return state;
}
function play_good(state) {
    let rng = state_prng_1.get_prng(state.prng);
    const adventure = generate_random_good_adventure(rng, state.characteristics.level, state.inventory);
    state.last_adventure = adventure;
    const { gains: { level, health, mana, strength, agility, vitality, wisdom, luck, coins, tokens, weapon, armor, improved_weapon, improved_armor, } } = adventure;
    // TODO store hid for no repetition
    if (level)
        state_character_1.increase_stat(state.characteristics, state_character_1.CharacterStat.level);
    if (health)
        state_character_1.increase_stat(state.characteristics, state_character_1.CharacterStat.health, health);
    if (mana)
        state_character_1.increase_stat(state.characteristics, state_character_1.CharacterStat.mana, mana);
    if (strength)
        state_character_1.increase_stat(state.characteristics, state_character_1.CharacterStat.strength, strength);
    if (agility)
        state_character_1.increase_stat(state.characteristics, state_character_1.CharacterStat.agility, agility);
    if (vitality)
        state_character_1.increase_stat(state.characteristics, state_character_1.CharacterStat.vitality, vitality);
    if (wisdom)
        state_character_1.increase_stat(state.characteristics, state_character_1.CharacterStat.wisdom, wisdom);
    if (luck)
        state_character_1.increase_stat(state.characteristics, state_character_1.CharacterStat.luck, luck);
    // TODO wallet
    if (weapon)
        receive_item(state, weapon);
    if (armor)
        receive_item(state, armor);
    if (improved_weapon) {
        let weapon_to_enhance = state_inventory_1.get_item_in_slot(state.inventory, definitions_1.InventorySlot.weapon);
        if (weapon_to_enhance && weapon_to_enhance.enhancement_level < logic_weapons_1.MAX_ENHANCEMENT_LEVEL)
            logic_weapons_1.enhance(weapon_to_enhance);
        // TODO enhance another weapon as fallback
    }
    if (improved_armor) {
        const armor_to_enhance = state_inventory_1.get_item_in_slot(state.inventory, definitions_1.InventorySlot.armor);
        if (armor_to_enhance && armor_to_enhance.enhancement_level < logic_armors_1.MAX_ENHANCEMENT_LEVEL)
            logic_armors_1.enhance(armor_to_enhance);
        // TODO enhance another armor as fallback
    }
    state.prng = state_prng_1.update_use_count(state.prng, rng);
    return state;
}
/////////////////////
function play(state) {
    // TODO good / bad
    return play_good(state);
}
exports.play = play;
function equip_item(state, coordinates) {
    state.inventory = state_inventory_1.equip_item(state.inventory, coordinates);
    return state;
}
exports.equip_item = equip_item;
function unequip_item(state, slot) {
    state.inventory = state_inventory_1.unequip_item(state.inventory, slot);
    return state;
}
exports.unequip_item = unequip_item;
function discard_item(state, coordinates) {
    // TODO
    return state;
}
exports.discard_item = discard_item;
/////////////////////
//# sourceMappingURL=index.js.map