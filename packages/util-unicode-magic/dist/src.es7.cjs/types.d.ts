import { Enum } from 'typescript-string-enums';
interface CharMapping {
    id: string;
    inherits?: string;
    alphabet_upper?: string;
    alphabet_lower?: string;
    numbers?: string;
    other: {
        [k: string]: string;
    };
}
declare const Font: {
    EnclosedLight: "EnclosedLight";
};
declare type Font = Enum<typeof Font>;
export { CharMapping, Font };
