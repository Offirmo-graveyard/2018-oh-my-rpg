import { Enum } from 'typescript-string-enums';
import { Adventure } from '@oh-my-rpg/state-the-boring-rpg';
declare const TextStyle: {
    item_quality_common: "item_quality_common";
    item_quality_uncommon: "item_quality_uncommon";
    item_quality_rare: "item_quality_rare";
    item_quality_epic: "item_quality_epic";
    item_quality_legendary: "item_quality_legendary";
    item_quality_artifact: "item_quality_artifact";
    change_outline: "change_outline";
};
declare type TextStyle = Enum<typeof TextStyle>;
interface RenderingOptions {
    stylize: (style: TextStyle, s: string) => string;
    last_adventure?: Adventure;
}
export { TextStyle, RenderingOptions };
