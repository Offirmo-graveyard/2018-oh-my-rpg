import { Item } from '@oh-my-rpg/definitions';
import { Armor } from '@oh-my-rpg/logic-armors';
import { Weapon } from '@oh-my-rpg/logic-weapons';
import * as RichText from '@oh-my-rpg/rich-text-format';
declare function render_armor_name(i: Armor): RichText.Document;
declare function render_armor(i: Armor): RichText.Document;
declare function render_weapon(i: Weapon): RichText.Document;
declare function render_item(i?: Item): RichText.Document;
export { render_item, render_armor, render_armor_name, render_weapon };
