"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = require("@offirmo/random");
const _1 = require(".");
describe('🎲  Persistable PRNG state', function () {
    beforeEach(_1.xxx_internal_reset_prng_cache);
    describe('🆕  initial value', function () {
        it('should have correct defaults', function () {
            const state = _1.factory();
            expect(state.use_count).to.equal(0);
            expect(state.seed).to.equal(_1.DEFAULT_SEED);
        });
    });
    describe('🌰  set seed', function () {
        it('should work and reset use count');
    });
    describe('update after use', function () {
        it('should correctly persist prng state', function () {
            let state = _1.factory();
            let prng = _1.get_prng(state);
            expect(random_1.Random.integer(0, 10)(prng), 'random 1').to.equal(2);
            expect(random_1.Random.integer(0, 10)(prng), 'random 2').to.equal(5);
            state = _1.update_use_count(state, prng);
            expect(state.use_count).to.equal(2);
        });
    });
    describe('get_prng', function () {
        it('should return a working PRNG engine', function () {
            const state = _1.factory();
            const prng = _1.get_prng(state);
            expect(random_1.Random.integer(0, 10)(prng), 'random 1').to.equal(2);
            expect(random_1.Random.integer(0, 10)(prng), 'random 2').to.equal(5);
            expect(random_1.Random.integer(0, 10)(prng), 'random 3').to.equal(7);
            expect(random_1.Random.integer(0, 10)(prng), 'random 4').to.equal(0);
            expect(random_1.Random.integer(0, 10)(prng), 'random 5').to.equal(0);
            expect(random_1.Random.integer(0, 10)(prng), 'random 6').to.equal(3);
            expect(random_1.Random.integer(0, 10)(prng), 'random 7').to.equal(6);
            expect(random_1.Random.integer(0, 10)(prng), 'random 8').to.equal(10);
        });
        it('should return a repeatable PRNG engine', function () {
            let state = _1.factory();
            let prng = _1.get_prng(state);
            expect(random_1.Random.integer(0, 10)(prng), 'random 1').to.equal(2);
            expect(random_1.Random.integer(0, 10)(prng), 'random 2').to.equal(5);
            state = _1.update_use_count(state, prng);
            expect(random_1.Random.integer(0, 10)(prng), 'random 3a').to.equal(7);
            expect(random_1.Random.integer(0, 10)(prng), 'random 4a').to.equal(0);
            _1.xxx_internal_reset_prng_cache();
            prng = _1.get_prng(state);
            expect(random_1.Random.integer(0, 10)(prng), 'random 3b').to.equal(7);
            expect(random_1.Random.integer(0, 10)(prng), 'random 4b').to.equal(0);
        });
    });
});
//# sourceMappingURL=index_spec.js.map