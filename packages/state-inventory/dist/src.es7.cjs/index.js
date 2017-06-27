"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const definitions_1 = require("@oh-my-rpg/definitions");
exports.InventorySlot = definitions_1.InventorySlot;
/////////////////////
function factory() {
    return {
        unslotted_capacity: 20,
        slotted: {},
        unslotted: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        ],
    };
}
exports.factory = factory;
/////////////////////
// pass the item: can be a hint in case we have "allocated" bags (TODO one day)
function find_unused_coordinates(state, item) {
    return state.unslotted.findIndex(item => !item);
}
function auto_sort(state) {
    // no auto-sort for now
    return state;
}
/////////////////////
function coordinates_to_string(coordinates) {
    return `#${coordinates}`;
}
/////////////////////
function add_item(state, item) {
    const coordinates = find_unused_coordinates(state, item);
    if (coordinates < 0)
        throw new Error(`state-inventory: can't add item, inventory is full!`);
    state.unslotted[coordinates] = item;
    return auto_sort(state);
}
exports.add_item = add_item;
function remove_item(state, coordinates) {
    const item_to_remove = get_item_at_coordinates(state, coordinates);
    if (!item_to_remove)
        throw new Error(`state-inventory: can't remove item at ${coordinates_to_string(coordinates)}, not found!`);
    state.unslotted[coordinates] = null;
    return auto_sort(state);
}
exports.remove_item = remove_item;
function equip_item(state, coordinates) {
    const item_to_equip = get_item_at_coordinates(state, coordinates);
    if (!item_to_equip)
        throw new Error(`state-inventory: can't equip item at ${coordinates_to_string(coordinates)}, not found!`);
    const slot = item_to_equip.slot;
    if (slot === definitions_1.InventorySlot.none)
        throw new Error(`state-inventory: can't equip item at ${coordinates_to_string(coordinates)}, not equipable!`);
    const item_previously_in_slot = get_item_in_slot(state, slot); // may be null
    state.slotted[slot] = item_to_equip;
    state.unslotted[coordinates] = item_previously_in_slot; // whether it's null or not
    return auto_sort(state);
}
exports.equip_item = equip_item;
function unequip_item(state, slot) {
    const item_to_unequip = get_item_in_slot(state, slot);
    if (!item_to_unequip)
        throw new Error(`state-inventory: can't unequip item from slot ${slot}, it\'s empty!`);
    const coordinates = find_unused_coordinates(state, item_to_unequip);
    if (coordinates < 0)
        throw new Error(`state-inventory: can't unequip item, inventory is full!`);
    state.slotted[slot] = null;
    delete state.slotted[slot];
    state.unslotted[coordinates] = item_to_unequip;
    return auto_sort(state);
}
exports.unequip_item = unequip_item;
/////////////////////
function get_equiped_item_count(state) {
    return Object.keys(state.slotted).length;
}
exports.get_equiped_item_count = get_equiped_item_count;
function get_unequiped_item_count(state) {
    return state.unslotted.filter(i => !!i).length;
}
exports.get_unequiped_item_count = get_unequiped_item_count;
function get_item_count(state) {
    return get_equiped_item_count(state) + get_unequiped_item_count(state);
}
exports.get_item_count = get_item_count;
function get_item_at_coordinates(state, coordinates) {
    return state.unslotted[coordinates] || null;
}
exports.get_item_at_coordinates = get_item_at_coordinates;
function get_item_in_slot(state, slot) {
    return state.slotted[slot] || null;
}
exports.get_item_in_slot = get_item_in_slot;
function* iterables_unslotted(state) {
    yield* state.unslotted;
}
exports.iterables_unslotted = iterables_unslotted;
/////////////////////
//# sourceMappingURL=index.js.map