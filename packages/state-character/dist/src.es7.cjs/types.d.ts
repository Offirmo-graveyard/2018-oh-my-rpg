import { Enum } from 'typescript-string-enums';
declare const CharacterStat: {
    agility: "agility";
    health: "health";
    level: "level";
    luck: "luck";
    mana: "mana";
    strength: "strength";
    charisma: "charisma";
    wisdom: "wisdom";
};
declare type CharacterStat = Enum<typeof CharacterStat>;
declare const CharacterClass: {
    novice: "novice";
    warrior: "warrior";
    barbarian: "barbarian";
    paladin: "paladin";
    sculptor: "sculptor";
    pirate: "pirate";
    ninja: "ninja";
    rogue: "rogue";
    wizard: "wizard";
    hunter: "hunter";
    druid: "druid";
    priest: "priest";
};
declare type CharacterClass = Enum<typeof CharacterClass>;
interface Characteristics {
    level: number;
    health: number;
    mana: number;
    strength: number;
    agility: number;
    charisma: number;
    wisdom: number;
    luck: number;
}
interface State {
    name: string;
    klass: CharacterClass;
    characteristics: Characteristics;
}
export { CharacterStat, CharacterClass, Characteristics, State };
