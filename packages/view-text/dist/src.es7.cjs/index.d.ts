import { ItemQuality } from '@oh-my-rpg/definitions';
import { Weapon } from '@oh-my-rpg/logic-weapons';
import { Armor } from '@oh-my-rpg/logic-armors';
declare function get_ansi_color_for_quality(quality: ItemQuality): string;
declare function get_html_color_for_quality(quality: ItemQuality): string;
declare function render_weapon(w: Weapon): string;
declare function render_armor(a: Armor): string;
export { get_ansi_color_for_quality, get_html_color_for_quality, render_weapon, render_armor };
