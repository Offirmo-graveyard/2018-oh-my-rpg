"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = require("@offirmo/random");
const static_adventure_data = require("@oh-my-rpg/data/src/adventure_archetype");
const types_1 = require("./types");
exports.CoinsGain = types_1.CoinsGain;
/////////////////////
const ALL_ADVENTURE_ARCHETYPES = static_adventure_data
    .filter((paa) => paa.published !== false)
    .map((paa) => {
    const gains = (paa.post || {}).gains || {};
    // type fields
    gains.level = !!gains.level;
    gains.agility = gains.agility || 0;
    gains.health = gains.health || 0;
    gains.luck = gains.luck || 0;
    gains.mana = gains.mana || 0;
    gains.strength = gains.strength || 0;
    gains.charisma = gains.charisma || 0;
    gains.wisdom = gains.wisdom || 0;
    gains.random_charac = gains.random_charac || 0;
    gains.class_main_charac = gains.class_main_charac || 0;
    gains.class_secondary_charac = gains.class_secondary_charac || 0;
    gains.coins = gains.coins || types_1.CoinsGain.none;
    gains.tokens = gains.tokens || 0;
    gains.armor = !!gains.armor;
    gains.weapon = !!gains.weapon;
    gains.armor_or_weapon = !!gains.armor_or_weapon;
    gains.armor_improvement = !!gains.armor_improvement;
    gains.weapon_improvement = !!gains.weapon_improvement;
    gains.armor_or_weapon_improvement = !!gains.armor_or_weapon_improvement;
    return {
        hid: paa.hid,
        good: paa.good,
        post: {
            gains: gains
        },
    };
});
const ALL_GOOD_ADVENTURE_ARCHETYPES = ALL_ADVENTURE_ARCHETYPES.filter(aa => aa.good);
const ALL_BAD_ADVENTURE_ARCHETYPES = ALL_ADVENTURE_ARCHETYPES.filter(aa => !aa.good);
const COINS_GAIN_MULTIPLIER_PER_LEVEL = 1.1;
const COINS_GAIN_RANGES = {
    none: [0, 0],
    small: [1, 20],
    medium: [50, 100],
    big: [500, 700],
    huge: [900, 2000],
};
/////////////////////
// useful for picking an exact archetype (ex. tests)
function get_archetype(hid) {
    const aa = ALL_ADVENTURE_ARCHETYPES.find(aa => aa.hid === hid);
    if (!aa)
        throw new Error(`logic-adventures, get_archetype(): couldn't find archetype "${hid}" !`);
    return aa;
}
exports.get_archetype = get_archetype;
function pick_random_good_archetype(rng) {
    return random_1.Random.pick(rng, ALL_GOOD_ADVENTURE_ARCHETYPES);
}
exports.pick_random_good_archetype = pick_random_good_archetype;
function pick_random_bad_archetype(rng) {
    return random_1.Random.pick(rng, ALL_BAD_ADVENTURE_ARCHETYPES);
}
exports.pick_random_bad_archetype = pick_random_bad_archetype;
function generate_random_coin_gain(rng, range, player_level) {
    if (range === types_1.CoinsGain.none)
        return 0;
    const level_multiplier = player_level * COINS_GAIN_MULTIPLIER_PER_LEVEL;
    const interval = COINS_GAIN_RANGES[range];
    return random_1.Random.integer(interval[0] * level_multiplier, interval[1] * level_multiplier)(rng);
}
exports.generate_random_coin_gain = generate_random_coin_gain;
/////////////////////
//# sourceMappingURL=index.js.map