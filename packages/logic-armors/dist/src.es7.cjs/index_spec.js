"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = require("@offirmo/random");
const _1 = require(".");
describe('🛡 👕  armor logic:', function () {
    describe('creation', function () {
        it('should allow creating a random armor', function () {
            const rng = random_1.Random.engines.mt19937().seed(789);
            const armor1 = _1.factory(rng);
            expect(armor1).to.deep.equal({
                slot: 'armor',
                base_hid: 'socks',
                qualifier1_hid: 'onyx',
                qualifier2_hid: 'tormentor',
                quality: 'legendary',
                base_strength: 14,
                enhancement_level: 0
            });
            expect(rng.getUseCount()).to.equal(5);
            const armor2 = _1.factory(rng);
            expect(rng.getUseCount()).to.equal(10);
            expect(armor2).not.to.deep.equal(armor1);
        });
        it('should allow creating a partially predefined armor', function () {
            const rng = random_1.Random.engines.mt19937().seed(789);
            const armor = _1.factory(rng, {
                base_hid: 'shoes',
                quality: 'artifact',
            });
            expect(armor).to.deep.equal({
                slot: 'armor',
                base_hid: 'shoes',
                qualifier1_hid: 'skeleton',
                qualifier2_hid: 'training',
                quality: 'artifact',
                base_strength: 19,
                enhancement_level: 0
            });
            expect(rng.getUseCount()).to.equal(3); // 2 less random picks
        });
    });
    describe('enhancement', function () {
        it('should allow enhancing a armor', function () {
            let armor = _1.generate_random_demo_armor();
            armor.enhancement_level = 0;
            armor = _1.enhance_armor(armor);
            expect(armor.enhancement_level, 1).to.equal(1);
            for (let i = 2; i <= _1.MAX_ENHANCEMENT_LEVEL; ++i) {
                armor = _1.enhance_armor(armor);
                expect(armor.enhancement_level, i).to.equal(i);
            }
            expect(armor.enhancement_level, 'max').to.equal(_1.MAX_ENHANCEMENT_LEVEL);
        });
        it('should fail if armor is already at max enhancement level', () => {
            let armor = _1.generate_random_demo_armor();
            armor.enhancement_level = _1.MAX_ENHANCEMENT_LEVEL;
            function enhance() {
                armor = _1.enhance_armor(armor);
            }
            expect(enhance).to.throw('maximal enhancement level!');
        });
    });
});
//# sourceMappingURL=index_spec.js.map