"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
const _1 = require(".");
describe('🤕 ❤️  Character state - reducer', function () {
    describe('🆕  initial state', function () {
        it('should have correct defaults', function () {
            const state = _1.create();
            expect(state).to.deep.equal({
                schema_version: consts_1.SCHEMA_VERSION,
                revision: 0,
                name: '[anonymous]',
                klass: _1.CharacterClass.novice,
                attributes: {
                    level: 1,
                    health: 1,
                    mana: 0,
                    strength: 1,
                    agility: 1,
                    charisma: 1,
                    wisdom: 1,
                    luck: 1
                },
            });
        });
    });
    describe('⬆ stat increase', function () {
        it('should fail on invalid amount', function () {
            let state = _1.create();
            function increase_0() {
                state = _1.increase_stat(state, _1.CharacterAttribute.agility, 0);
            }
            expect(increase_0).to.throw('invalid amount!');
            function decrease() {
                state = _1.increase_stat(state, _1.CharacterAttribute.agility, -1);
            }
            expect(decrease).to.throw('invalid amount!');
        });
        it('should work in nominal case', function () {
            let state = _1.create();
            state = _1.increase_stat(state, _1.CharacterAttribute.agility);
            expect(state.attributes.agility).to.equal(2);
            expect(state.attributes).to.deep.equal({
                level: 1,
                health: 1,
                mana: 0,
                strength: 1,
                agility: 2,
                charisma: 1,
                wisdom: 1,
                luck: 1
            });
            state = _1.increase_stat(state, _1.CharacterAttribute.agility, 2);
            expect(state.attributes.agility).to.equal(4);
            expect(state.attributes).to.deep.equal({
                level: 1,
                health: 1,
                mana: 0,
                strength: 1,
                agility: 4,
                charisma: 1,
                wisdom: 1,
                luck: 1
            });
            state = _1.increase_stat(state, _1.CharacterAttribute.agility);
            expect(state.attributes.agility).to.equal(5);
            expect(state.attributes).to.deep.equal({
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
        it('should cap');
    });
});
//# sourceMappingURL=state_spec.js.map