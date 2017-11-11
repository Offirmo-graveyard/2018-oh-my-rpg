"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
const definitions_1 = require("@oh-my-rpg/definitions");
const _1 = require(".");
describe('📦 📦 📦  Inventory state - reducer', function () {
    const EXPECTED_UNSLOTTED_INVENTORY_LENGTH = 20;
    describe('🆕 initial state', function () {
        it('should have correct defaults', function () {
            const state = _1.create();
            expect(state).to.deep.equal({
                schema_version: consts_1.SCHEMA_VERSION,
                revision: 0,
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
            });
            expect(state.unslotted_capacity).to.equal(EXPECTED_UNSLOTTED_INVENTORY_LENGTH);
            expect(state.unslotted).to.have.lengthOf(EXPECTED_UNSLOTTED_INVENTORY_LENGTH);
            expect(Object.keys(state.slotted)).to.have.lengthOf(0);
            expect(_1.get_item_count(state), 'i').to.equal(0);
            expect(_1.get_equiped_item_count(state), 'e').to.equal(0);
            expect(_1.get_unequiped_item_count(state), 'u').to.equal(0);
        });
    });
    describe('📥 item addition', function () {
        it('should work on empty state', function () {
            const item = { slot: definitions_1.InventorySlot.none, quality: definitions_1.ItemQuality.common };
            let state = _1.create();
            state = _1.add_item(state, item);
            expect(state.unslotted).to.have.lengthOf(EXPECTED_UNSLOTTED_INVENTORY_LENGTH);
            expect(_1.get_item_count(state)).to.equal(1);
        });
        it('should work on simple non-empty state', function () {
            const item = { slot: definitions_1.InventorySlot.none, quality: definitions_1.ItemQuality.common };
            let state = _1.create();
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            expect(state.unslotted, 'unslotted').to.have.lengthOf(EXPECTED_UNSLOTTED_INVENTORY_LENGTH);
            expect(_1.get_item_count(state), 'item count').to.equal(2);
        });
        it('should fail when the inventory is full', function () {
            const item = { slot: definitions_1.InventorySlot.none, quality: definitions_1.ItemQuality.common };
            let state = _1.create();
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            expect(state.unslotted).to.have.lengthOf(EXPECTED_UNSLOTTED_INVENTORY_LENGTH);
            function addLast() {
                state = _1.add_item(state, item);
            }
            expect(addLast).to.throw('inventory is full!');
        });
        it('should find a free slot when some items where recently removed', function () {
            const item1 = { slot: definitions_1.InventorySlot.none, quality: definitions_1.ItemQuality.common };
            const item2 = { slot: definitions_1.InventorySlot.none, quality: definitions_1.ItemQuality.common };
            let state = _1.create();
            state = _1.add_item(state, item1);
            state = _1.add_item(state, item1);
            state = _1.remove_item(state, 0);
            state = _1.add_item(state, item2);
            expect(_1.get_item_count(state), 'item count').to.equal(2);
            // note: state was auto-sorted
            expect(_1.get_item_at_coordinates(state, 0)).to.equal(item1);
            expect(_1.get_item_at_coordinates(state, 1)).to.equal(item2);
        });
    });
    describe('📤 item removal', function () {
        it('should throw on empty target slot', function () {
            let state = _1.create();
            function remove_one() {
                state = _1.remove_item(state, 0);
            }
            expect(remove_one).to.throw('can\'t remove item at #0, not found');
        });
        it('should work in nominal case', function () {
            const item = { slot: definitions_1.InventorySlot.none, quality: definitions_1.ItemQuality.common };
            let state = _1.create();
            state = _1.add_item(state, item);
            state = _1.add_item(state, item);
            state = _1.remove_item(state, 0);
            expect(_1.get_item_count(state), 'item count').to.equal(1);
            expect(_1.get_item_at_coordinates(state, 1)).to.be.null;
            expect(_1.get_item_at_coordinates(state, 2)).to.be.null;
        });
    });
    describe('⬆ item equipping', function () {
        it('should fail on missing item', function () {
            let state = _1.create();
            function equip_empty() {
                state = _1.equip_item(state, 0);
            }
            expect(equip_empty).to.throw('can\'t equip item at #0, not found!');
        });
        it('should fail on non-equipable item', function () {
            let state = _1.create();
            const item = { slot: definitions_1.InventorySlot.none, quality: definitions_1.ItemQuality.common };
            state = _1.add_item(state, item);
            function equip_unequipable() {
                state = _1.equip_item(state, 0);
            }
            expect(equip_unequipable).to.throw('not equipable!');
        });
        it('should work on simple non-empty state, equip to the correct slot and correctly remove from unslotted', function () {
            let state = _1.create();
            const item = { slot: definitions_1.InventorySlot.weapon, quality: definitions_1.ItemQuality.common };
            state = _1.add_item(state, item);
            expect(_1.get_equiped_item_count(state), 'e1').to.equal(0);
            expect(_1.get_unequiped_item_count(state), 'u1').to.equal(1);
            expect(_1.get_item_count(state), 'i1').to.equal(1);
            state = _1.equip_item(state, 0);
            expect(_1.get_equiped_item_count(state), 'e2').to.equal(1);
            expect(_1.get_unequiped_item_count(state), 'u2').to.equal(0);
            expect(_1.get_item_count(state), 'i1').to.equal(1);
        });
        it('should work on simple non-empty state and correctly swap if the slot was occupied', function () {
            let state = _1.create();
            const item1 = { slot: definitions_1.InventorySlot.weapon, quality: definitions_1.ItemQuality.common };
            state = _1.add_item(state, item1);
            state = _1.equip_item(state, 0);
            const item2 = { slot: definitions_1.InventorySlot.weapon, quality: definitions_1.ItemQuality.common };
            state = _1.add_item(state, item2);
            state = _1.equip_item(state, 0);
            expect(_1.get_equiped_item_count(state), 'e').to.equal(1);
            expect(_1.get_unequiped_item_count(state), 'u').to.equal(1);
            expect(_1.get_item_count(state), 'i').to.equal(2);
            expect(_1.get_item_in_slot(state, definitions_1.InventorySlot.weapon)).to.equal(item2);
            expect(_1.get_item_at_coordinates(state, 0)).to.equal(item1);
        });
    });
    describe('⬇ item unequipping', function () {
        it('should fail on missing slot', function () {
            let state = _1.create();
            function unequip_empty() {
                state = _1.unequip_item(state, definitions_1.InventorySlot.weapon);
            }
            expect(unequip_empty).to.throw('can\'t unequip item from slot weapon, it\'s empty!');
        });
        it('should work on simple non-empty state, unequip to the correct slot and correctly add to unslotted', function () {
            let state = _1.create();
            const item = { slot: definitions_1.InventorySlot.weapon, quality: definitions_1.ItemQuality.common };
            state = _1.add_item(state, item);
            state = _1.equip_item(state, 0);
            state = _1.unequip_item(state, definitions_1.InventorySlot.weapon);
            expect(_1.get_item_count(state), 'item count 1').to.equal(1);
            expect(_1.get_unequiped_item_count(state), 'item count 2').to.equal(1);
            expect(_1.get_item_in_slot(state, definitions_1.InventorySlot.weapon)).to.be.null;
        });
        it('should fail when the inventory is full', function () {
            let state = _1.create();
            const item = { slot: definitions_1.InventorySlot.weapon, quality: definitions_1.ItemQuality.common };
            state = _1.add_item(state, item);
            state = _1.equip_item(state, 0);
            const itemX = { slot: definitions_1.InventorySlot.none, quality: definitions_1.ItemQuality.common };
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            state = _1.add_item(state, itemX);
            expect(_1.get_item_count(state), 'item count 1').to.equal(21);
            expect(_1.get_unequiped_item_count(state), 'item count 2').to.equal(20);
            function unequip() {
                state = _1.unequip_item(state, definitions_1.InventorySlot.weapon);
            }
            expect(unequip).to.throw('inventory is full!');
        });
    });
    describe('misc items iteration', function () {
        it('should yield all unequiped slots', () => {
            const item1 = { slot: definitions_1.InventorySlot.armor, quality: definitions_1.ItemQuality.common };
            const item2 = { slot: definitions_1.InventorySlot.weapon, quality: definitions_1.ItemQuality.common };
            const item3 = { slot: definitions_1.InventorySlot.none, quality: definitions_1.ItemQuality.common };
            let state = _1.create();
            state = _1.add_item(state, item1);
            state = _1.add_item(state, item2);
            state = _1.add_item(state, item3);
            state = _1.remove_item(state, 0);
            const yielded_items = Array.from(_1.iterables_unslotted(state));
            console.log(yielded_items);
            expect(yielded_items).to.have.lengthOf(EXPECTED_UNSLOTTED_INVENTORY_LENGTH);
            expect(yielded_items[0]).to.equal(item2);
            expect(yielded_items[1]).to.equal(item3);
            expect(yielded_items[2]).to.be.null;
            expect(yielded_items[3]).to.be.null;
            expect(yielded_items[EXPECTED_UNSLOTTED_INVENTORY_LENGTH - 1]).to.be.null;
        });
    });
});
//# sourceMappingURL=state_spec.js.map