"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const definitions_1 = require("@oh-my-rpg/definitions");
const logic_armors_1 = require("@oh-my-rpg/logic-armors");
const logic_weapons_1 = require("@oh-my-rpg/logic-weapons");
const RichText = require("@oh-my-rpg/rich-text-format");
//import { i18n_messages: I18N_ADVENTURES } from '@oh-my-rpg/logic-adventures'
const logic_armors_2 = require("@oh-my-rpg/logic-armors");
const logic_weapons_2 = require("@oh-my-rpg/logic-weapons");
function render_armor_name(i) {
    if (i.slot !== definitions_1.InventorySlot.armor)
        throw new Error(`render_armor(): can't render a ${i.slot}!`);
    const _ = logic_armors_2.i18n_messages.en;
    const b = _.armor.base[i.base_hid];
    const q1 = _.armor.qualifier1[i.qualifier1_hid];
    const q2 = _.armor.qualifier2[i.qualifier2_hid];
    const builder = RichText.span()
        .addClass('item__name')
        .pushText(q2.startsWith('of')
        ? '{{q1|Capitalize}} {{base|Capitalize}} {{q2|Capitalize}}'
        : '{{q2|Capitalize}} {{q1|Capitalize}} {{base|Capitalize}}');
    if (i.enhancement_level) {
        const $node_enhancement = RichText.span()
            .addClass('item--enhancement')
            .pushText(`+${i.enhancement_level}`)
            .done();
        builder.pushText(' ').pushNode($node_enhancement, 'enhancement');
    }
    const $doc = builder.done();
    $doc.$sub.base = RichText.span().pushText(b).done();
    $doc.$sub.q1 = RichText.span().pushText(q1).done();
    $doc.$sub.q2 = RichText.span().pushText(q2).done();
    return $doc;
}
exports.render_armor_name = render_armor_name;
function render_armor(i) {
    if (i.slot !== definitions_1.InventorySlot.armor)
        throw new Error(`render_armor(): can't render a ${i.slot}!`);
    const $node_quality = RichText.span().pushText(i.quality).done();
    const [min, max] = logic_armors_1.get_damage_reduction_interval(i);
    const $node_values = RichText.span()
        .addClass('armor--values')
        .pushText(`[${min} ↔ ${max}]`)
        .done();
    return RichText.span()
        .addClass('item', 'item--armor', 'item--quality--' + i.quality)
        .pushText('{{quality}} {{name}} {{values}}')
        .pushRawNode($node_quality, 'quality')
        .pushRawNode(render_armor_name(i), 'name')
        .pushRawNode($node_values, 'values')
        .done();
}
exports.render_armor = render_armor;
function render_weapon_name(i) {
    if (i.slot !== definitions_1.InventorySlot.weapon)
        throw new Error(`render_weapon(): can't render a ${i.slot}!`);
    const _ = logic_weapons_2.i18n_messages.en;
    const b = _.weapon.base[i.base_hid];
    const q1 = _.weapon.qualifier1[i.qualifier1_hid];
    const q2 = _.weapon.qualifier2[i.qualifier2_hid];
    const builder = RichText.span()
        .addClass('item__name')
        .pushText(q2.startsWith('of')
        ? '{{q1|Capitalize}} {{base|Capitalize}} {{q2|Capitalize}}'
        : '{{q2|Capitalize}} {{q1|Capitalize}} {{base|Capitalize}}');
    if (i.enhancement_level) {
        const $node_enhancement = RichText.span()
            .addClass('item--enhancement')
            .pushText(`+${i.enhancement_level}`)
            .done();
        builder.pushText(' ').pushNode($node_enhancement, 'enhancement');
    }
    const $doc = builder.done();
    $doc.$sub.base = RichText.span().pushText(b).done();
    $doc.$sub.q1 = RichText.span().pushText(q1).done();
    $doc.$sub.q2 = RichText.span().pushText(q2).done();
    return $doc;
}
function render_weapon(i) {
    if (i.slot !== definitions_1.InventorySlot.weapon)
        throw new Error(`render_weapon(): can't render a ${i.slot}!`);
    const $node_quality = RichText.span().pushText(i.quality).done();
    const [min, max] = logic_weapons_1.get_damage_interval(i);
    const $node_values = RichText.span()
        .addClass('weapon--values')
        .pushText(`[${min} ↔ ${max}]`)
        .done();
    return RichText.span()
        .addClass('item', 'item--weapon', 'item--quality--' + i.quality)
        .pushText('{{quality}} {{name}} {{values}}')
        .pushRawNode($node_quality, 'quality')
        .pushRawNode(render_weapon_name(i), 'name')
        .pushRawNode($node_values, 'values')
        .done();
}
exports.render_weapon = render_weapon;
function render_item(i) {
    if (!i)
        return RichText.span().pushText('').done();
    switch (i.slot) {
        case definitions_1.InventorySlot.armor:
            return render_armor(i);
        case definitions_1.InventorySlot.weapon:
            return render_weapon(i);
        default:
            throw new Error(`render_item(): don't know how to render a "${i.slot}" !`);
    }
}
exports.render_item = render_item;
//# sourceMappingURL=items.js.map