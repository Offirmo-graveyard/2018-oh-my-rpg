"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const definitions_1 = require("@oh-my-rpg/definitions");
const logic_weapons_1 = require("@oh-my-rpg/logic-weapons");
const logic_armors_1 = require("@oh-my-rpg/logic-armors");
const state_inventory_1 = require("@oh-my-rpg/state-inventory");
const state_character_1 = require("@oh-my-rpg/state-character");
const constants_1 = require("./constants");
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
function get_item_icon_for(i) {
    if (!i)
        return '⋯';
    switch (i.slot) {
        case definitions_1.InventorySlot.weapon:
            return constants_1.WEAPON_ICON;
        case definitions_1.InventorySlot.armor:
            return constants_1.ARMOR_ICON;
        default:
            throw new Error(`get_item_icon_for(): no icon for slot "${i.slot}" !`);
    }
}
function get_characteristic_icon_for(stat) {
    switch (stat) {
        case state_character_1.CharacterStat.level:
            return '👶🏽';
        case state_character_1.CharacterStat.health:
            return '💗';
        case state_character_1.CharacterStat.mana:
            return '💙';
        case state_character_1.CharacterStat.agility:
            return '🤸🏽';
        case state_character_1.CharacterStat.luck:
            return '🤹🏼‍♀️';
        case state_character_1.CharacterStat.strength:
            // 🏋🏽
            // '💪🏽'
            return '🏋🏽';
        case state_character_1.CharacterStat.vitality:
            return '🏊🏽';
        case state_character_1.CharacterStat.wisdom:
            // '🙏🏽'
            return '👵🏽';
        default:
            throw new Error(`get_characteristic_icon_for(): no icon for stat "${stat}" !`);
    }
}
///////
// note: we don't render the quality to allow coloring according to the environment (ansi, html)
function render_weapon(w) {
    if (w.slot !== definitions_1.InventorySlot.weapon)
        throw new Error(`render_weapon(): can't render a ${w.slot} !`);
    const name = `${w.qualifier1_hid}.${w.base_hid}.of.the.${w.qualifier2_hid}`;
    const enhancement_level = w.enhancement_level
        ? ` +${w.enhancement_level}`
        : '';
    const [min_damage, max_damage] = logic_weapons_1.get_damage_interval(w);
    return `${name}${enhancement_level} [${min_damage} ↔ ${max_damage}]`;
}
exports.render_weapon = render_weapon;
// note: we don't render the quality to allow coloring according to the environment (ansi, html)
function render_armor(a) {
    if (a.slot !== definitions_1.InventorySlot.armor)
        throw new Error(`render_armor(): can't render a ${a.slot} !`);
    const name = `${a.qualifier1_hid}.${a.base_hid}.of.the.${a.qualifier2_hid}`;
    const enhancement_level = a.enhancement_level
        ? ` +${a.enhancement_level}`
        : '';
    const [min_dmg_reduc, max_dmg_reduc] = logic_armors_1.get_damage_reduction_interval(a);
    return `${name}${enhancement_level} [${min_dmg_reduc} ↔ ${max_dmg_reduc}]`;
}
exports.render_armor = render_armor;
function render_item(i) {
    if (!i)
        return '';
    switch (i.slot) {
        case definitions_1.InventorySlot.weapon:
            return render_weapon(i);
        case definitions_1.InventorySlot.armor:
            return render_armor(i);
        default:
            throw new Error(`render_item(): don't know how to render a "${i.slot}" !`);
    }
}
exports.render_item = render_item;
function render_characteristics(state, last_adventure) {
    return state_character_1.CHARACTER_STATS.map((stat) => {
        const icon = get_characteristic_icon_for(stat);
        const label = stat;
        const value = state[stat];
        const padded_label = `${label}............`.slice(0, 11);
        const padded_human_values = `.......${value}`.slice(-4);
        const update_notice = last_adventure && last_adventure.gains[stat]
            ? ` increased +${last_adventure.gains[stat]} 🆙`
            : '';
        return `${icon}  ${padded_label}${padded_human_values}${update_notice}`;
    }).join('\n');
}
exports.render_characteristics = render_characteristics;
function render_equipment(inventory, last_adventure) {
    const equiped_items = definitions_1.ITEM_SLOTS.map(lodash_1.partial(state_inventory_1.get_item_in_slot, inventory));
    return equiped_items.map((i, index) => {
        const padded_slot = `${definitions_1.ITEM_SLOTS[index]}  `.slice(0, 6);
        const icon = get_item_icon_for(i);
        const label = render_item(i);
        // TODO handle if no item
        const update_notice = i && last_adventure && ((last_adventure.gains.improved_weapon && i.slot === 'weapon')
            || (last_adventure.gains.improved_armor && i.slot === 'armor'))
            ? ` enhanced +1! 🆙`
            : '';
        return `${padded_slot}: ${icon}  ${label}${update_notice}`;
    }).join('\n');
}
exports.render_equipment = render_equipment;
function render_inventory(inventory, last_adventure) {
    const misc_items = Array.from(state_inventory_1.iterables_unslotted(inventory));
    return misc_items.map((i, index) => {
        const icon = get_item_icon_for(i);
        const label = render_item(i);
        const padded_human_index = `  ${index + 1}.`.slice(-3);
        const update_notice = i && last_adventure && (last_adventure.gains.weapon === i || last_adventure.gains.armor === i)
            ? ` new 🎁`
            : '';
        return `${padded_human_index} ${icon}  ${label}${update_notice}`;
    }).join('\n');
}
exports.render_inventory = render_inventory;
function render_wallet(wallet, last_adventure) {
    const padded_coins = `.......${wallet.coin_count}`.slice(-5);
    const padded_tokens = `.......${wallet.token_count}`.slice(-5);
    const coins_update_notice = last_adventure && last_adventure.gains.coins
        ? ` gained +${last_adventure.gains.coins} 🆙`
        : '';
    const tokens_update_notice = last_adventure && last_adventure.gains.tokens
        ? ` gained +${last_adventure.gains.tokens} 🆙`
        : '';
    return `💰  coins..${padded_coins}${coins_update_notice}
💠  tokens.${padded_tokens}${tokens_update_notice}`;
}
exports.render_wallet = render_wallet;
function render_adventure(a) {
    const icon = '⚔';
    const text = a.hid;
    let res = `${icon} ${text} TODO render_adventure`;
    if (a.gains.weapon)
        res += `\nNew item: ` + render_item(a.gains.weapon);
    if (a.gains.armor)
        res += `\nNew item: ` + render_item(a.gains.armor);
    return res;
}
exports.render_adventure = render_adventure;
/////////////////////
//# sourceMappingURL=index.js.map