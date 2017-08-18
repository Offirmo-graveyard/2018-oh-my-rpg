"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_prng_1 = require("@oh-my-rpg/state-prng");
const state_inventory_1 = require("@oh-my-rpg/state-inventory");
const state_wallet_1 = require("@oh-my-rpg/state-wallet");
const _1 = require(".");
describe('⚔ 👑 😪  The Boring RPG', function () {
    beforeEach(() => state_prng_1.xxx_internal_reset_prng_cache());
    describe('🆕 initial state', function () {
        it('should be correct', function () {
            const state = _1.factory();
            // check presence of sub-states
            expect(state).to.have.property('meta');
            expect(state).to.have.property('avatar');
            expect(state).to.have.property('inventory');
            expect(state).to.have.property('wallet');
            expect(state).to.have.property('prng');
            // init of custom values
            expect(state).to.have.property('click_count', 0);
            expect(state).to.have.property('good_click_count', 0);
            expect(state).to.have.property('meaningful_interaction_count', 0);
            expect(state.last_adventure).to.be.null;
            // check our 2 predefined items are present and equipped
            expect(state_inventory_1.get_equiped_item_count(state.inventory), 'equipped').to.equal(2);
            expect(state_inventory_1.get_unequiped_item_count(state.inventory), 'unequipped').to.equal(0);
        });
    });
    describe('XXX savegame migration', function () {
        context('when the version is more recent', function () {
            it('should throw with a meaningful error', () => {
                function load() {
                    _1.migrate_to_latest({
                        version: 99999
                    });
                }
                expect(load).to.throw('more recent version');
            });
        });
        context('when the version is up to date', function () {
            it('should return the state without change', () => {
                const state = {
                    version: _1.VERSION,
                    foo: 42
                };
                expect(_1.migrate_to_latest(state)).to.deep.equal({
                    version: _1.VERSION,
                    foo: 42
                });
            });
        });
        context('when the version is outdated', function () {
            it('TODO should migrate to latest version');
        });
    });
    describe('👆🏾 user actions', function () {
        describe('🤘🏽 play', function () {
            context('🚫 when the cooldown has NOT passed', function () {
                it('should generate a negative adventure');
                it('should not decrease user stats');
                it('should punish the user by increasing the cooldown');
                it('may actually result in a good outcome (idea)');
            });
            context('✅ when the cooldown has passed', function () {
                it('should sometime generate a story adventure', () => {
                    const state = _1.play(_1.factory());
                    expect(state.last_adventure).not.to.be.null;
                    expect(state.last_adventure.good).to.be.true;
                });
                it('should correctly increment counters', () => {
                    const state = _1.play(_1.factory());
                    expect(state).to.have.property('click_count', 1);
                    expect(state).to.have.property('good_click_count', 1);
                    expect(state).to.have.property('meaningful_interaction_count', 1);
                });
                it('should sometime generate a battle adventure');
                context('when the adventure is a story', function () {
                    describe('the outcome', function () {
                        it('should sometime be a coin gain', () => {
                            let state = _1.factory();
                            state = _1.play(state, 'dying_man');
                            // we got money
                            expect(state_wallet_1.get_currency_amount(state.wallet, state_wallet_1.Currency.coin)).to.be.above(0);
                        });
                        it('should sometime be a token gain');
                        it('should sometime be a stat gain');
                        it('should sometime be an item gain', () => {
                            let state = _1.factory();
                            state = _1.play(state, 'rare_goods_seller');
                            // check our 2 predefined items are still present and equipped
                            expect(state_inventory_1.get_equiped_item_count(state.inventory), 'equipped').to.equal(2);
                            // a new item is present
                            expect(state_inventory_1.get_unequiped_item_count(state.inventory), 'unequipped').to.equal(1);
                            // it's a weapon !
                            expect(state_inventory_1.get_item_at_coordinates(state.inventory, 0)).to.have.property('slot', 'weapon');
                        });
                        it('should sometime be an item improvement');
                    });
                });
                context('when the adventure is a battle', function () {
                    describe('the outcome', function () {
                        it('should sometime be a victory');
                        it('should sometime be a defeat');
                    });
                });
            });
        });
        describe('inventory management', function () {
            it('should allow un-equiping an item'); // not now, but useful for ex. for immediately buying a better item on the market
            it('should allow equiping an item, correctly swapping with an already equiped item');
            it('should allow selling an item');
        });
    });
});
//# sourceMappingURL=index_spec.js.map