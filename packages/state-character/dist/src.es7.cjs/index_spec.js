"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe('🤕 ❤️  Character stats logic', function () {
    describe('🆕  initial state', function () {
        it('should have correct defaults', function () {
            const state = _1.factory();
            expect(state).to.deep.equal({
                name: '[anonymous]',
                klass: _1.CharacterClass.novice,
                characteristics: {
                    level: 1,
                    health: 1,
                    mana: 0,
                    strength: 1,
                    agility: 1,
                    charisma: 1,
                    wisdom: 1,
                    luck: 1
                }
            });
        });
    });
    describe('⬆ stat increase', function () {
        it('should fail on invalid amount', function () {
            let state = _1.factory();
            function increase_0() {
                state = _1.increase_stat(state, _1.CharacterStat.agility, 0);
            }
            expect(increase_0).to.throw('invalid amount!');
            function decrease() {
                state = _1.increase_stat(state, _1.CharacterStat.agility, -1);
            }
            expect(decrease).to.throw('invalid amount!');
        });
        it('should work in nominal case', function () {
            let state = _1.factory();
            state = _1.increase_stat(state, _1.CharacterStat.agility);
            expect(state.characteristics.agility).to.equal(2);
            expect(state.characteristics).to.deep.equal({
                level: 1,
                health: 1,
                mana: 0,
                strength: 1,
                agility: 2,
                charisma: 1,
                wisdom: 1,
                luck: 1
            });
            state = _1.increase_stat(state, _1.CharacterStat.agility, 2);
            expect(state.characteristics.agility).to.equal(4);
            expect(state.characteristics).to.deep.equal({
                level: 1,
                health: 1,
                mana: 0,
                strength: 1,
                agility: 4,
                charisma: 1,
                wisdom: 1,
                luck: 1
            });
            state = _1.increase_stat(state, _1.CharacterStat.agility);
            expect(state.characteristics.agility).to.equal(5);
            expect(state.characteristics).to.deep.equal({
                level: 1,
                health: 1,
                mana: 0,
                strength: 1,
                agility: 5,
                charisma: 1,
                wisdom: 1,
                luck: 1
            });
        });
    });
});
//# sourceMappingURL=index_spec.js.map