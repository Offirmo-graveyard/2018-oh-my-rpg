"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_string_enums_1 = require("typescript-string-enums");
/////////////////////
const CharacterStat = typescript_string_enums_1.Enum('agility', 'health', 'level', 'luck', 'mana', 'strength', 'vitality', 'wisdom');
exports.CharacterStat = CharacterStat;
const CharacterClass = typescript_string_enums_1.Enum('novice', 'warrior', 'barbarian', 'paladin', 'sculptor', 'pirate', 'ninja', 'rogue', 'wizard', 'hunter', 'druid', 'priest');
exports.CharacterClass = CharacterClass;
/////////////////////
//# sourceMappingURL=types.js.map