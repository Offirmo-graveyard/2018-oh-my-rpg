"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const definitions_1 = require("@oh-my-rpg/definitions");
const state_inventory_1 = require("@oh-my-rpg/state-inventory");
const RichText = require("@oh-my-rpg/rich-text-format");
const state_wallet_1 = require("@oh-my-rpg/state-wallet");
const items_1 = require("./items");
function inventory_coordinate_to_sortable_alpha_index(coord) {
    return (' ' + (coord + 1)).slice(-2);
}
function render_inventory(inventory) {
    const $doc = RichText.ordered_list()
        .addClass('inventory--unslotted')
        .done();
    const misc_items = Array.from(state_inventory_1.iterables_unslotted(inventory));
    misc_items.forEach((i, index) => {
        if (!i)
            return;
        $doc.$sub[inventory_coordinate_to_sortable_alpha_index(index)] = items_1.render_item(i);
        // TODO add coordinates
    });
    return $doc;
}
exports.render_inventory = render_inventory;
function render_equipment(inventory) {
    const $doc = RichText.unordered_list()
        .addClass('inventory--equipment')
        .done();
    definitions_1.ITEM_SLOTS.forEach((slot) => {
        const item = state_inventory_1.get_item_in_slot(inventory, slot);
        const $doc_item = RichText.span()
            .pushText((slot + '   ').slice(0, 6))
            .pushText(': ')
            .pushNode(item
            ? items_1.render_item(item)
            : RichText.span().pushText('-').done())
            .done();
        $doc.$sub[slot] = $doc_item;
    });
    return $doc;
}
exports.render_equipment = render_equipment;
function render_wallet(wallet) {
    const $doc = RichText.unordered_list()
        .addClass('inventory--wallet')
        .done();
    state_wallet_1.ALL_CURRENCIES.forEach((c) => {
        const amount = state_wallet_1.get_currency_amount(wallet, c);
        const $doc_currency = RichText.span()
            .addClass('currency--' + c)
            .pushText('{{qty}} ' + c + (amount === 1 ? '' : 's')) // TODO localize properly ;)
            .done();
        $doc_currency.$sub.qty = RichText.span().pushText('' + amount).done(); // TODO format according to locale?
        $doc.$sub[c] = $doc_currency;
    });
    return $doc;
}
exports.render_wallet = render_wallet;
function render_full_inventory(inventory, wallet) {
    const $doc = RichText.paragraph()
        .pushText('Active equipment:')
        .pushNode(render_equipment(inventory), 'equipped')
        .pushText('Wallet:')
        .pushNode(render_wallet(wallet), 'wallet')
        .pushText('Inventory:')
        .pushNode(render_inventory(inventory), 'inventory')
        .done();
    return $doc;
}
exports.render_full_inventory = render_full_inventory;
//# sourceMappingURL=inventory.js.map