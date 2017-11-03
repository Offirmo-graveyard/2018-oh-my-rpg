import { Enum } from 'typescript-string-enums';
declare const TextClass: {
    person: "person";
    item: "item";
    place: "place";
};
declare type TextClass = Enum<typeof TextClass>;
export { TextClass };
