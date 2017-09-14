"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = require("@offirmo/random");
/////////////////////
const definitions_1 = require("@oh-my-rpg/definitions");
const state_meta_1 = require("@oh-my-rpg/state-meta");
const state_character_1 = require("@oh-my-rpg/state-character");
const state_wallet_1 = require("@oh-my-rpg/state-wallet");
const state_inventory_1 = require("@oh-my-rpg/state-inventory");
const state_prng_1 = require("@oh-my-rpg/state-prng");
const logic_weapons_1 = require("@oh-my-rpg/logic-weapons");
const logic_armors_1 = require("@oh-my-rpg/logic-armors");
const logic_shop_1 = require("@oh-my-rpg/logic-shop");
const logic_adventures_1 = require("@oh-my-rpg/logic-adventures");
const types_1 = require("./types");
exports.VERSION = types_1.VERSION;
exports.GainType = types_1.GainType;
/////////////////////
function factory() {
    let state = {
        version: types_1.VERSION,
        meta: state_meta_1.factory(),
        avatar: state_character_1.factory(),
        inventory: state_inventory_1.factory(),
        wallet: state_wallet_1.factory(),
        prng: state_prng_1.factory(),
        last_adventure: null,
        click_count: 0,
        good_click_count: 0,
        meaningful_interaction_count: 0,
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
function migrate_to_latest(state) {
    const src_version = state.version;
    if (!state.version) {
        // new game
        return factory();
    }
    if (src_version === types_1.VERSION)
        return state;
    if (src_version > types_1.VERSION)
        throw new Error('You saved game was is from a more recent version of this game. Please update!');
    console.warn(`migrating data from v${src_version} to ${types_1.VERSION}...`);
    // TODO migrate properly when out of beta
    console.error(`beta: migrating through full reset !`);
    return factory();
}
exports.migrate_to_latest = migrate_to_latest;
/////////////////////
function instantiate_adventure_archetype(rng, aa, player_level, inventory) {
    let { hid, good, post: { gains: { level: should_gain_a_level, agility, health, luck, mana, strength, charisma, wisdom, coins: coins_gain, tokens, armor: should_receive_armor, weapon: should_receive_weapon, armor_or_weapon: should_receive_armor_or_weapon, armor_improvement, weapon_improvement, armor_or_weapon_improvement, } } } = aa;
    // instantiate the random gains
    // TODO take into account the inventory
    if (should_receive_armor_or_weapon) {
        if (random_1.Random.bool()(rng))
            should_receive_armor = true;
        else
            should_receive_weapon = true;
    }
    if (armor_or_weapon_improvement) {
        if (random_1.Random.bool()(rng))
            armor_improvement = true;
        else
            weapon_improvement = true;
    }
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
            charisma,
            wisdom,
            luck,
            coins: logic_adventures_1.generate_random_coin_gain(rng, coins_gain, new_player_level),
            tokens,
            weapon,
            armor,
            armor_improvement,
            weapon_improvement,
        }
    };
}
function receive_stat_increase(state, stat, amount = 1) {
    state.avatar = state_character_1.increase_stat(state.avatar, stat, amount);
    return state;
}
function receive_item(state, item) {
    // TODO handle inventory full
    state.inventory = state_inventory_1.add_item(state.inventory, item);
    return state;
}
function receive_coins(state, amount) {
    state.wallet = state_wallet_1.add_amount(state.wallet, state_wallet_1.Currency.coin, amount);
    return state;
}
function receive_tokens(state, amount) {
    state.wallet = state_wallet_1.add_amount(state.wallet, state_wallet_1.Currency.token, amount);
    return state;
}
function play_good(state, explicit_adventure_archetype_hid) {
    state.good_click_count++;
    state.meaningful_interaction_count++;
    let rng = state_prng_1.get_prng(state.prng);
    const aa = explicit_adventure_archetype_hid
        ? logic_adventures_1.get_archetype(explicit_adventure_archetype_hid)
        : logic_adventures_1.pick_random_good_archetype(rng);
    const adventure = instantiate_adventure_archetype(rng, aa, state.avatar.characteristics.level, state.inventory);
    state.last_adventure = adventure;
    const { gains: { level, health, mana, strength, agility, charisma, wisdom, luck, coins, tokens, armor, weapon, armor_improvement, weapon_improvement, } } = adventure;
    // TODO store hid for no repetition
    let gain_count = 0;
    if (level) {
        gain_count++;
        state = receive_stat_increase(state, state_character_1.CharacterStat.level);
    }
    if (health) {
        gain_count++;
        state = receive_stat_increase(state, state_character_1.CharacterStat.health, health);
    }
    if (mana) {
        gain_count++;
        state = receive_stat_increase(state, state_character_1.CharacterStat.mana, mana);
    }
    if (strength) {
        gain_count++;
        state = receive_stat_increase(state, state_character_1.CharacterStat.strength, strength);
    }
    if (agility) {
        gain_count++;
        state = receive_stat_increase(state, state_character_1.CharacterStat.agility, agility);
    }
    if (charisma) {
        gain_count++;
        state = receive_stat_increase(state, state_character_1.CharacterStat.charisma, charisma);
    }
    if (wisdom) {
        gain_count++;
        state = receive_stat_increase(state, state_character_1.CharacterStat.wisdom, wisdom);
    }
    if (luck) {
        gain_count++;
        state = receive_stat_increase(state, state_character_1.CharacterStat.luck, luck);
    }
    if (coins) {
        gain_count++;
        state = receive_coins(state, coins);
    }
    if (tokens) {
        gain_count++;
        state = receive_tokens(state, tokens);
    }
    if (weapon) {
        gain_count++;
        state = receive_item(state, weapon);
    }
    if (armor) {
        gain_count++;
        state = receive_item(state, armor);
    }
    if (weapon_improvement) {
        gain_count++;
        let weapon_to_enhance = state_inventory_1.get_item_in_slot(state.inventory, definitions_1.InventorySlot.weapon);
        if (weapon_to_enhance && weapon_to_enhance.enhancement_level < logic_weapons_1.MAX_ENHANCEMENT_LEVEL)
            logic_weapons_1.enhance(weapon_to_enhance);
        // TODO enhance another weapon as fallback
    }
    if (armor_improvement) {
        gain_count++;
        const armor_to_enhance = state_inventory_1.get_item_in_slot(state.inventory, definitions_1.InventorySlot.armor);
        if (armor_to_enhance && armor_to_enhance.enhancement_level < logic_armors_1.MAX_ENHANCEMENT_LEVEL)
            logic_armors_1.enhance(armor_to_enhance);
        // TODO enhance another armor as fallback
    }
    state.prng = state_prng_1.update_use_count(state.prng, rng);
    return state;
}
function appraise_item_at_coordinates(state, coordinates) {
    const item_to_sell = state_inventory_1.get_item_at_coordinates(state.inventory, coordinates);
    if (!item_to_sell)
        throw new Error('Sell: No item!');
    return logic_shop_1.appraise(item_to_sell);
}
exports.appraise_item_at_coordinates = appraise_item_at_coordinates;
/////////////////////
// allow passing an explicit adventure archetype for testing !
function play(state, explicit_adventure_archetype_hid) {
    state.click_count++;
    // TODO good / bad
    return play_good(state, explicit_adventure_archetype_hid);
}
exports.play = play;
function equip_item(state, coordinates) {
    // TODO count it as a meaningful interaction if positive (or with a limit)
    state.inventory = state_inventory_1.equip_item(state.inventory, coordinates);
    return state;
}
exports.equip_item = equip_item;
function sell_item(state, coordinates) {
    const price = appraise_item_at_coordinates(state, coordinates);
    state.inventory = state_inventory_1.remove_item(state.inventory, coordinates);
    state.wallet = state_wallet_1.add_amount(state.wallet, state_wallet_1.Currency.coin, price);
    // TODO count it as a meaningful interaction if positive (or with a limit)
    return state;
}
exports.sell_item = sell_item;
function rename_avatar(state, new_name) {
    // TODO count it as a meaningful interaction once
    state.avatar = state_character_1.rename(state.avatar, new_name);
    return state;
}
exports.rename_avatar = rename_avatar;
function change_avatar_class(state, klass) {
    // TODO make this have an effect (in v2 ?)
    state.avatar = state_character_1.switch_class(state.avatar, klass);
    return state;
}
exports.change_avatar_class = change_avatar_class;
/////////////////////
//# sourceMappingURL=index.js.map