"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_string_enums_1 = require("typescript-string-enums");
const types_1 = require("./types");
exports.CharacterStat = types_1.CharacterStat;
exports.CharacterClass = types_1.CharacterClass;
/////////////////////
const CHARACTER_STATS = typescript_string_enums_1.Enum.keys(types_1.CharacterStat);
exports.CHARACTER_STATS = CHARACTER_STATS;
/*
    CharacterStat.level,

    CharacterStat.health,
    CharacterStat.mana,

    CharacterStat.strength,
    CharacterStat.agility,
    CharacterStat.charisma,
    CharacterStat.wisdom,
    CharacterStat.luck,
]*/
///////
function factory() {
    return {
        name: '[anonymous]',
        klass: types_1.CharacterClass.novice,
        attributes: {
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
exports.rename = rename;
function switch_class(state, klass) {
    state.klass = klass;
    return state;
}
exports.switch_class = switch_class;
function increase_stat(state, stat, amount = 1) {
    if (amount <= 0)
        throw new Error(`Error while increasing stat "${stat}: invalid amount!`);
    // TODO stats caps
    state.attributes[stat] += amount;
    return state;
}
exports.increase_stat = increase_stat;
/////////////////////
//# sourceMappingURL=index.js.map