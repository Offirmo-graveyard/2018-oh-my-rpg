"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_inventory_1 = require("@oh-my-rpg/state-inventory");
const _1 = require(".");
describe('⚔ 👑 😪  The Boring RPG', function () {
    describe('🆕 initial state', function () {
        it('should be correct', function () {
            const state = _1.factory();
            expect(state_inventory_1.get_equiped_item_count(state.inventory), 'e').to.equal(2);
            expect(state_inventory_1.get_unequiped_item_count(state.inventory), 'u').to.equal(0);
        });
    });
});
//# sourceMappingURL=index_spec.js.map