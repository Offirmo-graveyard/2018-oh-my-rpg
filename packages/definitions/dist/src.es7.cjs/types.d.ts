import { Enum } from 'typescript-string-enums';
declare const ItemQuality: {
    common: "common";
    uncommon: "uncommon";
    rare: "rare";
    epic: "epic";
    legendary: "legendary";
    artifact: "artifact";
};
declare type ItemQuality = Enum<typeof ItemQuality>;
declare const InventorySlot: {
    none: "none";
    weapon: "weapon";
    armor: "armor";
};
declare type InventorySlot = Enum<typeof InventorySlot>;
interface Item {
    slot: InventorySlot;
    quality: ItemQuality;
}
export { ItemQuality, InventorySlot, Item };
