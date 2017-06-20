"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = require("@offirmo/random");
const _1 = require(".");
describe('⚔ 🏹  weapon logic:', function () {
    describe('creation', function () {
        it('should allow creating a random weapon', function () {
            const rng = random_1.Random.engines.mt19937().seed(789);
            const weapon1 = _1.factory(rng);
            expect(weapon1).to.deep.equal({
                slot: 'weapon',
                base_hid: 'luth',
                qualifier1_hid: 'simple',
                qualifier2_hid: 'mercenary',
                quality: 'legendary',
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
                slot: 'weapon',
                base_hid: 'spoon',
                qualifier1_hid: 'composite',
                qualifier2_hid: 'twink',
                quality: 'artifact',
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
});
//# sourceMappingURL=index_spec.js.map