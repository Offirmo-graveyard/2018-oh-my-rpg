"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const definitions_1 = require("@oh-my-rpg/definitions");
const random_1 = require("@offirmo/random");
const _1 = require(".");
describe('⚔ 🏹  weapon logic:', function () {
    describe('creation', function () {
        it('should allow creating a random weapon', function () {
            const rng = random_1.Random.engines.mt19937().seed(789);
            const weapon1 = _1.factory(rng);
            expect(weapon1).to.deep.equal({
                slot: definitions_1.InventorySlot.weapon,
                base_hid: 'luth',
                qualifier1_hid: 'simple',
                qualifier2_hid: 'mercenary',
                quality: definitions_1.ItemQuality.legendary,
                base_strength: 14,
                enhancement_level: 0
            });
            expect(rng.getUseCount()).to.equal(5);
            const weapon2 = _1.factory(rng);
            expect(rng.getUseCount()).to.equal(10);
            expect(weapon2).not.to.deep.equal(weapon1);
        });
        it('should allow creating a partially predefined weapon', function () {
            const rng = random_1.Random.engines.mt19937().seed(789);
            const weapon = _1.factory(rng, {
                base_hid: 'spoon',
                quality: 'artifact',
            });
            expect(weapon).to.deep.equal({
                slot: definitions_1.InventorySlot.weapon,
                base_hid: 'spoon',
                qualifier1_hid: 'composite',
                qualifier2_hid: 'twink',
                quality: definitions_1.ItemQuality.artifact,
                base_strength: 19,
                enhancement_level: 0
            });
            expect(rng.getUseCount()).to.equal(3); // 2 less random picks
        });
    });
    describe('enhancement', function () {
        it('should allow enhancing a weapon', function () {
            let weapon = _1.generate_random_demo_weapon();
            weapon.enhancement_level = 0;
            weapon = _1.enhance(weapon);
            expect(weapon.enhancement_level, 1).to.equal(1);
            for (let i = 2; i <= _1.MAX_ENHANCEMENT_LEVEL; ++i) {
                weapon = _1.enhance(weapon);
                expect(weapon.enhancement_level, i).to.equal(i);
            }
            expect(weapon.enhancement_level, 'max').to.equal(_1.MAX_ENHANCEMENT_LEVEL);
        });
        it('should fail if weapon is already at max enhancement level', () => {
            let weapon = _1.generate_random_demo_weapon();
            weapon.enhancement_level = _1.MAX_ENHANCEMENT_LEVEL;
            function attempt_enhance() {
                weapon = _1.enhance(weapon);
            }
            expect(attempt_enhance).to.throw('maximal enhancement level!');
        });
    });
    describe('damage', function () {
        describe('interval', function () {
            it('should work', () => {
                const [min, max] = _1.get_damage_interval({
                    slot: definitions_1.InventorySlot.weapon,
                    base_hid: 'luth',
                    qualifier1_hid: 'simple',
                    qualifier2_hid: 'mercenary',
                    quality: 'legendary',
                    base_strength: 14,
                    enhancement_level: 3,
                });
                expect(min).to.be.a.number;
                expect(max).to.be.a.number;
                expect(max).to.be.above(min);
                expect(min).to.be.above(291); // min for legend+3
                expect(min).to.be.below(5824); // max for legend+3
                expect(max).to.be.above(291); // min for legend+3
                expect(max).to.be.below(5824); // max for legend+3
                expect(min).to.equal(3494);
                expect(max).to.equal(4659);
            });
        });
        describe('medium', function () {
            it('should work', () => {
                const med = _1.get_medium_damage({
                    slot: definitions_1.InventorySlot.weapon,
                    base_hid: 'luth',
                    qualifier1_hid: 'simple',
                    qualifier2_hid: 'mercenary',
                    quality: 'legendary',
                    base_strength: 14,
                    enhancement_level: 3,
                });
                expect(med).to.be.a.number;
                expect(med).to.be.above(291); // min for legend+3
                expect(med).to.be.below(5824); // max for legend+3
                expect(med).to.equal((4659 + 3494) / 2);
            });
        });
    });
});
//# sourceMappingURL=index_spec.js.map