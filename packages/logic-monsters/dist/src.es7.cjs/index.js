"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = require("@offirmo/random");
const types_1 = require("./types");
exports.MonsterRank = types_1.MonsterRank;
const data_1 = require("./data");
/////////////////////
function pick_random_rank(rng) {
    // on 10 times, 1 boss, 2 elites, 7 common
    return random_1.Random.bool(0.7)(rng)
        ? types_1.MonsterRank.common
        : random_1.Random.bool(0.66)(rng)
            ? types_1.MonsterRank.elite
            : types_1.MonsterRank.boss;
}
/////////////////////
const MONSTER_RELATIVE_LEVEL_SPREAD = 0.1;
const MAX_LEVEL = 9999; // TODO share that
function factory(rng, hints = {}) {
    const raw = hints.name
        ? data_1.ENTRIES.find(raw_monster => raw_monster.name === hints.name)
        : random_1.Random.pick(rng, data_1.ENTRIES);
    if (!raw)
        throw new Error(`OMR Monster factory: can't find a monster corresponding to hint "${hints.name}"!`);
    let level = -1;
    if (!hints.level)
        level = random_1.Random.integer(1, MAX_LEVEL)(rng);
    else {
        // provide a little variation around the given level
        const reference_level = hints.level;
        const variation = Math.round(Math.max(1, reference_level * MONSTER_RELATIVE_LEVEL_SPREAD));
        level = Math.max(1, Math.min(MAX_LEVEL, reference_level + random_1.Random.integer(-variation, variation)(rng)));
    }
    return {
        name: raw.name,
        level,
        rank: hints.rank || pick_random_rank(rng),
        possible_emoji: hints.possible_emoji || raw.emoji,
    };
}
exports.factory = factory;
/////////////////////
// for demo purpose, all characteristics having the same probability + also random enhancement level
function generate_random_demo_monster() {
    const rng = random_1.Random.engines.mt19937().autoSeed();
    return factory(rng);
}
exports.generate_random_demo_monster = generate_random_demo_monster;
/////////////////////
//# sourceMappingURL=index.js.map