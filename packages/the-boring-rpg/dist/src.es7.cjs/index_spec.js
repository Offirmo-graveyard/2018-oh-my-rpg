"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_prng_1 = require("@oh-my-rpg/state-prng");
const state_inventory_1 = require("@oh-my-rpg/state-inventory");
const _1 = require(".");
describe('⚔ 👑 😪  The Boring RPG', function () {
    beforeEach(() => state_prng_1.xxx_internal_reset_prng_cache());
    describe('🆕 initial state', function () {
        it('should be correct', function () {
            const state = _1.factory();
            expect(state_inventory_1.get_equiped_item_count(state.inventory), 'e').to.equal(2);
            expect(state_inventory_1.get_unequiped_item_count(state.inventory), 'u').to.equal(0);
        });
    });
    describe('user actions', function () {
        describe('play', function () {
            context('when the cooldown has NOT passed', function () {
                it('should generate a negative adventure');
                it('should not decrease user stats');
                it('should punish the user by increasing the cooldown');
            });
            context('when the cooldown has passed', function () {
                it('should sometime generate an adventure', () => {
                    const state = _1.play(_1.factory());
                    expect(state.last_adventure).not.to.be.null;
                    expect(state.last_adventure.good).not.to.be.true;
                });
                it('should update state according to the adventure output', () => {
                });
                it('should sometime generate a battle');
            });
        });
        describe('inventory management', function () {
        });
    });
});
//# sourceMappingURL=index_spec.js.map