"use strict";
////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
////////////
const QUALITY_STRENGTH_BONUS_AT_GENERATION = {
    common: 0,
    uncommon: 1,
    rare: 3,
    epic: 4,
    legendary: 5,
    artifact: 6
};
exports.QUALITY_STRENGTH_BONUS_AT_GENERATION = QUALITY_STRENGTH_BONUS_AT_GENERATION;
// actualized strength
// quality multipliers (see spreadsheet for calculation)
const QUALITY_STRENGTH_MULTIPLIER = {
    common: 1,
    uncommon: 19,
    rare: 46,
    epic: 91,
    legendary: 182,
    artifact: 333
};
exports.QUALITY_STRENGTH_MULTIPLIER = QUALITY_STRENGTH_MULTIPLIER;
const QUALITY_STRENGTH_SPREAD = {
    common: 6,
    uncommon: 5,
    rare: 4,
    epic: 3,
    legendary: 2,
    artifact: 1
};
exports.QUALITY_STRENGTH_SPREAD = QUALITY_STRENGTH_SPREAD;
const ENHANCEMENT_MULTIPLIER = 0.2;
exports.ENHANCEMENT_MULTIPLIER = ENHANCEMENT_MULTIPLIER;
////////////////////////////////////
//# sourceMappingURL=constants.js.map