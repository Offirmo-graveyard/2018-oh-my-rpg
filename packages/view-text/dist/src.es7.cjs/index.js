"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const definitions_1 = require("@oh-my-rpg/definitions");
const logic_weapons_1 = require("@oh-my-rpg/logic-weapons");
const logic_armors_1 = require("@oh-my-rpg/logic-armors");
/////////////////////
function get_ansi_color_for_quality(quality) {
    switch (quality) {
        case definitions_1.ItemQuality.common:
            return 'gray';
        case definitions_1.ItemQuality.uncommon:
            return 'green';
        case definitions_1.ItemQuality.rare:
            return 'blue';
        case definitions_1.ItemQuality.epic:
            return 'magenta';
        case definitions_1.ItemQuality.legendary:
            return 'red';
        case definitions_1.ItemQuality.artifact:
            return 'yellow';
        default:
            throw new Error(`get_ansi_color_for_quality(): Unknown ItemQuality : ${quality}`);
    }
}
exports.get_ansi_color_for_quality = get_ansi_color_for_quality;
// TODO better
function get_html_color_for_quality(quality) {
    switch (quality) {
        case definitions_1.ItemQuality.common:
            return 'gray';
        case definitions_1.ItemQuality.uncommon:
            return 'green';
        case definitions_1.ItemQuality.rare:
            return 'blue';
        case definitions_1.ItemQuality.epic:
            return 'magenta';
        case definitions_1.ItemQuality.legendary:
            return 'red';
        case definitions_1.ItemQuality.artifact:
            return 'yellow';
        default:
            throw new Error(`get_html_color_for_quality(): Unknown ItemQuality : ${quality}`);
    }
}
exports.get_html_color_for_quality = get_html_color_for_quality;
// note: we don't render the quality to allow coloring according to the environment (ansi, html)
function render_weapon(w) {
    if (w.slot !== definitions_1.InventorySlot.weapon)
        throw new Error(`render_weapon(): can't render a ${w.slot}!`);
    const name = `${w.qualifier1_hid}.${w.base_hid}.of.the.${w.qualifier2_hid}`;
    const enhancement_level = w.enhancement_level
        ? ` +${w.enhancement_level}`
        : '';
    const [min_damage, max_damage] = logic_weapons_1.get_damage_interval(w);
    return `${name}${enhancement_level} [${min_damage}⇢ ${max_damage}]`;
}
exports.render_weapon = render_weapon;
// note: we don't render the quality to allow coloring according to the environment (ansi, html)
function render_armor(a) {
    if (a.slot !== definitions_1.InventorySlot.armor)
        throw new Error(`render_armor(): can't render a ${a.slot}!`);
    const name = `${a.qualifier1_hid}.${a.base_hid}.of.the.${a.qualifier2_hid}`;
    const enhancement_level = a.enhancement_level
        ? ` +${a.enhancement_level}`
        : '';
    const [min_dmg_reduc, max_dmg_reduc] = logic_armors_1.get_damage_reduction_interval(a);
    return `${name}${enhancement_level} [${min_dmg_reduc}⇢ ${max_dmg_reduc}]`;
}
exports.render_armor = render_armor;
/////////////////////
//# sourceMappingURL=index.js.map