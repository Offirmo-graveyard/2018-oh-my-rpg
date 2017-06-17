"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = require("@offirmo/random");
const definitions_1 = require("@oh-my-rpg/definitions");
const static_weapon_data = require("@oh-my-rpg/data/src/weapon_component");
const types_1 = require("./types");
exports.WeaponPartType = types_1.WeaponPartType;
const WEAPON_BASES = static_weapon_data.filter((weapon_component) => weapon_component.type === types_1.WeaponPartType.base);
const WEAPON_QUALIFIERS1 = static_weapon_data.filter((weapon_component) => weapon_component.type === types_1.WeaponPartType.qualifier1);
const WEAPON_QUALIFIERS2 = static_weapon_data.filter((weapon_component) => weapon_component.type === types_1.WeaponPartType.qualifier2);
const MAX_ENHANCEMENT_LEVEL = 8;
exports.MAX_ENHANCEMENT_LEVEL = MAX_ENHANCEMENT_LEVEL;
const MIN_STRENGTH = 1;
exports.MIN_STRENGTH = MIN_STRENGTH;
const MAX_STRENGTH = 20;
exports.MAX_STRENGTH = MAX_STRENGTH;
/////////////////////
function pick_random_quality(rng) {
    // TODO high qualities rarer
    return random_1.Random.pick(rng, [
        definitions_1.ItemQuality.common,
        definitions_1.ItemQuality.uncommon,
        definitions_1.ItemQuality.rare,
        definitions_1.ItemQuality.epic,
        definitions_1.ItemQuality.legendary,
        definitions_1.ItemQuality.artifact,
    ]);
}
function pick_random_base(rng) {
    return random_1.Random.pick(rng, WEAPON_BASES).hid;
}
function pick_random_qualifier1(rng) {
    return random_1.Random.pick(rng, WEAPON_QUALIFIERS1).hid;
}
function pick_random_qualifier2(rng) {
    return random_1.Random.pick(rng, WEAPON_QUALIFIERS2).hid;
}
const pick_random_base_strength = random_1.Random.integer(MIN_STRENGTH, MAX_STRENGTH);
/////////////////////
function factory(rng, hints = {}) {
    // TODO add a check for hints to be in existing components
    return {
        slot: definitions_1.InventorySlot.weapon,
        base_hid: hints.base_hid || pick_random_base(rng),
        qualifier1_hid: hints.qualifier1_hid || pick_random_qualifier1(rng),
        qualifier2_hid: hints.qualifier2_hid || pick_random_qualifier2(rng),
        quality: hints.quality || pick_random_quality(rng),
        base_strength: hints.base_strength || pick_random_base_strength(rng),
        enhancement_level: hints.enhancement_level || 0,
    };
}
exports.factory = factory;
/////////////////////
// for demo purpose, all characteristics having the same probability + also random enhancement level
function generate_random_demo_weapon() {
    const rng = random_1.Random.engines.mt19937().autoSeed();
    return factory(rng, {
        enhancement_level: random_1.Random.integer(0, MAX_ENHANCEMENT_LEVEL)(rng)
    });
}
exports.generate_random_demo_weapon = generate_random_demo_weapon;
/////////////////////
function enhance_weapon(weapon) {
    if (weapon.enhancement_level >= MAX_ENHANCEMENT_LEVEL)
        throw new Error(`can't enhance a weapon above the maximal enhancement level!`);
    weapon.enhancement_level++;
    return weapon;
}
exports.enhance_weapon = enhance_weapon;
/////////////////////
//# sourceMappingURL=index.js.map