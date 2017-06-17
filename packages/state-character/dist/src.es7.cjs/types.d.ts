import { Enum } from 'typescript-string-enums';
declare const CharacterStat: {
    agility: "agility";
    health: "health";
    level: "level";
    luck: "luck";
    mana: "mana";
    strength: "strength";
    vitality: "vitality";
    wisdom: "wisdom";
};
declare type CharacterStat = Enum<typeof CharacterStat>;
interface State {
    agility: number;
    health: number;
    level: number;
    luck: number;
    mana: number;
    strength: number;
    vitality: number;
    wisdom: number;
}
export { CharacterStat, State };
