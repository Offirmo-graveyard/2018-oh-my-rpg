"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MANY_TABS = '																																							';
function indent(n) {
    return MANY_TABS.slice(0, n);
}
function apply_type($type, str, $classes, $sub_node_count, depth) {
    if ($type === 'br')
        return '<br/>\n';
    if ($type === 'hr')
        return '\n<hr/>\n';
    let result = '\n' + indent(depth) + `<${$type}`;
    if ($classes.length)
        result += ` class="${$classes.join(' ')}"`;
    result += '>' + str + ($sub_node_count ? '\n' + indent(depth) : '') + `</${$type}>`;
    return result;
}
const on_concatenate_sub_node = ({ state, sub_state }) => {
    return state + sub_state;
};
const callbacks = {
    on_node_enter: () => '',
    on_concatenate_str: ({ state, str }) => state + str,
    on_concatenate_sub_node,
    on_type: ({ state: str, $type, $node: { $classes, $sub }, depth }) => apply_type($type, str, $classes, Object.keys($sub).length, depth),
};
exports.callbacks = callbacks;
//# sourceMappingURL=to_html.js.map