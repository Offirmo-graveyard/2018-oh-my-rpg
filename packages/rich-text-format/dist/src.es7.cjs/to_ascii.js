"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
// TODO handle fixed width
// TODO handle boxification
function apply_class($class, str) {
    switch ($class) {
        case 'place':
            return chalk_1.default.green(str);
        case 'place-name':
        case 'item-name':
            return chalk_1.default.bold(str);
        case 'person':
            return chalk_1.default.blue(str);
        case 'item-weapon':
            return '⚔  ' + chalk_1.default.red(str);
        default:
            //console.warn(`${LIB}: unknown class "${$class}", ignored.`) // todo avoid repetition
            return str;
    }
}
const on_concatenate_sub_node = ({ state, sub_state, $id, $parent_node }) => {
    if ($parent_node.$type === 'ul')
        return state + '\n - ' + sub_state;
    if ($parent_node.$type === 'ol')
        return state + `\n ${(' ' + $id).slice(-2)}. ` + sub_state;
    return state + sub_state;
};
const callbacks = {
    on_node_enter: () => '',
    on_concatenate_str: ({ state, str }) => state + str,
    on_concatenate_sub_node,
    on_class_after: ({ state: str, $class }) => apply_class($class, str),
    on_type_br: ({ state }) => state + '\n',
    on_type_hr: ({ state }) => state + '\n------------------------------------------------------------\n',
};
exports.callbacks = callbacks;
//# sourceMappingURL=to_ascii.js.map