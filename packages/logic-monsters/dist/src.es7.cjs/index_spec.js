"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = require("@offirmo/random");
const _1 = require(".");
describe('🐀 🐉  monster logic - logic:', function () {
    describe('creation', function () {
        it('should allow creating a random monster', function () {
            const rng = random_1.Random.engines.mt19937().seed(789);
            const monster1 = _1.factory(rng);
            expect(monster1).to.deep.equal({
                name: 'drop bear',
                level: 808,
                rank: _1.MonsterRank.common,
                possible_emoji: '🐨',
            });
            expect(rng.getUseCount(), '# rng draws 1').to.equal(2);
            const monster2 = _1.factory(rng);
            expect(rng.getUseCount(), '# rng draws 2').to.equal(4);
            expect(monster2).not.to.deep.equal(monster1);
        });
        it('should allow creating a partially predefined monster', function () {
            const rng = random_1.Random.engines.mt19937().seed(123);
            const monster = _1.factory(rng, {
                name: 'crab',
                level: 12,
            });
            expect(monster).to.deep.equal({
                name: 'crab',
                level: 12,
                rank: _1.MonsterRank.common,
                possible_emoji: '🦀',
            });
            expect(rng.getUseCount(), '# rng draws').to.equal(1); // less random picks
        });
    });
});
//# sourceMappingURL=index_spec.js.map