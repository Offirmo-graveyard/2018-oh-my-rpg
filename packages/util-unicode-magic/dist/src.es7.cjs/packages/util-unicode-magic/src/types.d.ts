import { Enum } from 'typescript-string-enums';
interface CharMapping {
    id: string;
    inherits?: string;
    alphabet_upper?: number[];
    alphabet_lower?: number[];
    numbers?: number[];
    others: Map<number, string>;
}
declare const Font: {
    EnclosedLight: "EnclosedLight";
};
declare type Font = Enum<typeof Font>;
export { CharMapping, Font };
