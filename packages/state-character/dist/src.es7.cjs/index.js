"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.CharacterStat = types_1.CharacterStat;
/////////////////////
function factory() {
    return {
        level: 1,
        health: 1,
        mana: 0,
        strength: 1,
        agility: 1,
        vitality: 1,
        wisdom: 1,
        luck: 1
    };
}
exports.factory = factory;
/////////////////////
function increase_stat(state, stat, amount = 1) {
    if (amount <= 0)
        throw new Error(`Error while increasing stat "${stat}: invalid amount!`);
    state[stat] += amount;
    return state;
}
exports.increase_stat = increase_stat;
/////////////////////
//# sourceMappingURL=index.js.map