"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.CharacterStat = types_1.CharacterStat;
exports.CharacterClass = types_1.CharacterClass;
/////////////////////
const CHARACTER_STATS = [
    types_1.CharacterStat.level,
    types_1.CharacterStat.health,
    types_1.CharacterStat.mana,
    types_1.CharacterStat.strength,
    types_1.CharacterStat.agility,
    types_1.CharacterStat.charisma,
    types_1.CharacterStat.wisdom,
    types_1.CharacterStat.luck,
];
exports.CHARACTER_STATS = CHARACTER_STATS;
///////
function factory() {
    return {
        name: '[anonymous]',
        klass: types_1.CharacterClass.novice,
        characteristics: {
            level: 1,
            // TODO improve this
            health: 1,
            mana: 0,
            strength: 1,
            agility: 1,
            charisma: 1,
            wisdom: 1,
            luck: 1
        }
    };
}
exports.factory = factory;
/////////////////////
function rename(state, new_name) {
    if (!new_name)
        throw new Error(`Error while renaming to "${new_name}: invalid value!`);
    state.name = new_name;
    return state;
}
function increase_stat(state, stat, amount = 1) {
    if (amount <= 0)
        throw new Error(`Error while increasing stat "${stat}: invalid amount!`);
    // TODO stats caps
    state.characteristics[stat] += amount;
    return state;
}
exports.increase_stat = increase_stat;
/////////////////////
//# sourceMappingURL=index.js.map