"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const definitions_1 = require("@oh-my-rpg/definitions");
const logic_weapons_1 = require("@oh-my-rpg/logic-weapons");
const logic_armors_1 = require("@oh-my-rpg/logic-armors");
const state_inventory_1 = require("@oh-my-rpg/state-inventory");
const state_character_1 = require("@oh-my-rpg/state-character");
const types_1 = require("./types");
exports.TextStyle = types_1.TextStyle;
const DEFAULT_RENDERING_OPTIONS = {
    globalize: {
        formatMessage: (s) => s,
        formatNumber: (n) => `${n}`,
    },
    stylize: (style, s) => s
};
exports.DEFAULT_RENDERING_OPTIONS = DEFAULT_RENDERING_OPTIONS;
/////////////////////
function get_style_for_quality(quality) {
    switch (quality) {
        case definitions_1.ItemQuality.common:
            return types_1.TextStyle.item_quality_common;
        case definitions_1.ItemQuality.uncommon:
            return types_1.TextStyle.item_quality_uncommon;
        case definitions_1.ItemQuality.rare:
            return types_1.TextStyle.item_quality_rare;
        case definitions_1.ItemQuality.epic:
            return types_1.TextStyle.item_quality_epic;
        case definitions_1.ItemQuality.legendary:
            return types_1.TextStyle.item_quality_legendary;
        case definitions_1.ItemQuality.artifact:
            return types_1.TextStyle.item_quality_artifact;
        default:
            throw new Error(`get_style_for_quality(): Unknown ItemQuality : ${quality}`);
    }
}
function get_item_icon_for(i) {
    if (!i)
        return '⋯';
    switch (i.slot) {
        case definitions_1.InventorySlot.weapon:
            return '⚔';
        case definitions_1.InventorySlot.armor:
            return '🛡';
        default:
            throw new Error(`get_item_icon_for(): no icon for slot "${i.slot}" !`);
    }
}
function get_characteristic_icon_for(stat) {
    switch (stat) {
        case state_character_1.CharacterStat.level:
            return '👶';
        case state_character_1.CharacterStat.health:
            return '💗';
        case state_character_1.CharacterStat.mana:
            return '💙';
        case state_character_1.CharacterStat.agility:
            return '🤸';
        case state_character_1.CharacterStat.luck:
            return '🤹';
        case state_character_1.CharacterStat.strength:
            // 💪
            return '🏋';
        case state_character_1.CharacterStat.vitality:
            return '🏊';
        case state_character_1.CharacterStat.wisdom:
            // '🙏'
            return '👵';
        default:
            throw new Error(`get_characteristic_icon_for(): no icon for stat "${stat}" !`);
    }
}
///////
function render_weapon(w, options = DEFAULT_RENDERING_OPTIONS) {
    if (w.slot !== definitions_1.InventorySlot.weapon)
        throw new Error(`render_weapon(): can't render a ${w.slot} !`);
    const name = `${w.qualifier1_hid}.${w.base_hid}.of.the.${w.qualifier2_hid}`;
    const enhancement_level = w.enhancement_level
        ? ` +${w.enhancement_level}`
        : '';
    const [min_damage, max_damage] = logic_weapons_1.get_damage_interval(w);
    return options.stylize(get_style_for_quality(w.quality), `${name}${enhancement_level}`) + ` [${min_damage} ↔ ${max_damage}]`;
}
exports.render_weapon = render_weapon;
function render_armor(a, options = DEFAULT_RENDERING_OPTIONS) {
    if (a.slot !== definitions_1.InventorySlot.armor)
        throw new Error(`render_armor(): can't render a ${a.slot} !`);
    const name = `${a.qualifier1_hid}.${a.base_hid}.of.the.${a.qualifier2_hid}`;
    const enhancement_level = a.enhancement_level
        ? ` +${a.enhancement_level}`
        : '';
    const [min_dmg_reduc, max_dmg_reduc] = logic_armors_1.get_damage_reduction_interval(a);
    return options.stylize(get_style_for_quality(a.quality), `${name}${enhancement_level}`) + ` [${min_dmg_reduc} ↔ ${max_dmg_reduc}]`;
}
exports.render_armor = render_armor;
function render_item(i, options = DEFAULT_RENDERING_OPTIONS) {
    if (!i)
        return '';
    switch (i.slot) {
        case definitions_1.InventorySlot.weapon:
            return render_weapon(i, options);
        case definitions_1.InventorySlot.armor:
            return render_armor(i, options);
        default:
            throw new Error(`render_item(): don't know how to render a "${i.slot}" !`);
    }
}
exports.render_item = render_item;
function render_characteristics(state, options = DEFAULT_RENDERING_OPTIONS) {
    const { last_adventure: la } = options;
    return state_character_1.CHARACTER_STATS.map((stat) => {
        const icon = get_characteristic_icon_for(stat);
        const label = stat;
        const value = state.characteristics[stat];
        const padded_label = `${label}............`.slice(0, 11);
        const padded_human_values = `.......${value}`.slice(-4);
        const update_notice = options.stylize(types_1.TextStyle.change_outline, la && la.gains && la.gains[stat]
            ? ` increased by ${la.gains[stat]}! 🆙`
            : '');
        return `${icon}  ${padded_label}${padded_human_values}${update_notice}`;
    }).join('\n');
}
exports.render_characteristics = render_characteristics;
function render_equipment(inventory, options = DEFAULT_RENDERING_OPTIONS) {
    const equiped_items = definitions_1.ITEM_SLOTS.map(lodash_1.partial(state_inventory_1.get_item_in_slot, inventory));
    const { last_adventure: la } = options;
    return equiped_items.map((i, index) => {
        const padded_slot = `${definitions_1.ITEM_SLOTS[index]}  `.slice(0, 6);
        if (!i)
            return `${padded_slot}: -`;
        const icon = get_item_icon_for(i);
        const label = render_item(i, options);
        const update_notice = options.stylize(types_1.TextStyle.change_outline, i && la && la.gains && ((la.gains.improved_weapon && i.slot === 'weapon')
            || (la.gains.improved_armor && i.slot === 'armor'))
            ? ` enhanced! 🆙`
            : '');
        return `${padded_slot}: ${icon}  ${label}${update_notice}`;
    }).join('\n');
}
exports.render_equipment = render_equipment;
function render_inventory(inventory, options = DEFAULT_RENDERING_OPTIONS) {
    const misc_items = Array.from(state_inventory_1.iterables_unslotted(inventory));
    const { last_adventure: la } = options;
    return misc_items.map((i, index) => {
        const icon = get_item_icon_for(i);
        const label = render_item(i, options);
        const padded_human_index = `  ${index + 1}.`.slice(-3);
        const update_notice = options.stylize(types_1.TextStyle.change_outline, i && la && (la.gains.weapon === i || la.gains.armor === i)
            ? ` new! 🎁`
            : '');
        return `${padded_human_index} ${icon}  ${label}${update_notice}`;
    }).join('\n');
}
exports.render_inventory = render_inventory;
function render_wallet(wallet, options = DEFAULT_RENDERING_OPTIONS) {
    const { last_adventure: la } = options;
    const coins_update_notice = options.stylize(types_1.TextStyle.change_outline, la && la.gains.coins
        ? ` gained ${la.gains.coins}! 🆙`
        : '');
    const tokens_update_notice = options.stylize(types_1.TextStyle.change_outline, la && la.gains.tokens
        ? ` gained ${la.gains.tokens}! 🆙`
        : '');
    return `💰  ${wallet.coin_count} coins${coins_update_notice}
💠  ${wallet.token_count} tokens${tokens_update_notice}`;
}
exports.render_wallet = render_wallet;
function render_adventure(a, options = DEFAULT_RENDERING_OPTIONS) {
    const icon = '📃'; //'⚔'
    let res = `${icon}  `;
    const g = options.globalize;
    const formattedWeapon = a.gains.weapon ? render_item(a.gains.weapon, options) : '';
    const formattedArmor = a.gains.armor ? render_item(a.gains.armor, options) : '';
    const formattedItem = formattedWeapon || formattedArmor;
    const gains_for_display = Object.assign({}, a.gains, {
        formattedCoins: a.gains.coins ? g.formatNumber(a.gains.coins) : '',
        formattedWeapon,
        formattedArmor,
        formattedItem,
    });
    const raw_message = g.formatMessage(`clickmsg/${a.hid}`, gains_for_display);
    res += raw_message.split('\n').map((s) => s.trim()).join(' ');
    // TODO loot
    if (a.gains.weapon)
        res += `\nNew item: ` + gains_for_display.formattedWeapon;
    if (a.gains.armor)
        res += `\nNew item: ` + gains_for_display.formattedArmor;
    return res;
}
exports.render_adventure = render_adventure;
/////////////////////
//# sourceMappingURL=index.js.map