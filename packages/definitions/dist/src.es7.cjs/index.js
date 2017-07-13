"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const types_1 = require("./types");
const ITEM_QUALITIES = [
    types_1.ItemQuality.common,
    types_1.ItemQuality.uncommon,
    types_1.ItemQuality.rare,
    types_1.ItemQuality.epic,
    types_1.ItemQuality.legendary,
    types_1.ItemQuality.artifact,
];
exports.ITEM_QUALITIES = ITEM_QUALITIES;
const ITEM_SLOTS = [
    types_1.InventorySlot.weapon,
    types_1.InventorySlot.armor,
];
exports.ITEM_SLOTS = ITEM_SLOTS;
/////////////////////
tslib_1.__exportStar(require("./types"), exports);
/////////////////////
//# sourceMappingURL=index.js.map