"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/////////////////////
const punycode = require("punycode");
const constants_1 = require("./constants");
exports.CHAR_MAPPINGS = constants_1.CHAR_MAPPINGS;
exports.CHAR_MAPPINGS_BY_ID = constants_1.CHAR_MAPPINGS_BY_ID;
/////////////////////
/*
const MAPPING_FNS = CHAR_MAPPINGS.map(char_mapping => {

})*/
function mapUnicodeChar(str, callback) {
    return punycode.ucs2.decode(str)
        .map(callback)
        .join('');
}
const CODEPOINTS = {
    a: 'a'.codePointAt(0),
    z: 'z'.codePointAt(0),
    A: 'A'.codePointAt(0),
    Z: 'Z'.codePointAt(0),
    zero: '0'.codePointAt(0),
    nine: '9'.codePointAt(0),
};
function map_single_char(m, codepoint) {
    let c;
    if (!m.others.has(codepoint)) {
        if (m.numbers && codepoint >= CODEPOINTS.zero && codepoint <= CODEPOINTS.nine)
            c = punycode.ucs2.encode([m.numbers[codepoint - CODEPOINTS.zero]]);
        else if (m.alphabet_upper && codepoint >= CODEPOINTS.A && codepoint <= CODEPOINTS.Z)
            c = punycode.ucs2.encode([m.alphabet_upper[codepoint - CODEPOINTS.A]]);
        else if (m.alphabet_lower && codepoint >= CODEPOINTS.a && codepoint <= CODEPOINTS.z)
            c = punycode.ucs2.encode([m.alphabet_lower[codepoint - CODEPOINTS.a]]);
        else if (m.inherits)
            c = map_single_char(constants_1.CHAR_MAPPINGS_BY_ID[m.inherits], codepoint);
        else
            c = punycode.ucs2.encode([codepoint]);
        // cache it
        m.others.set(codepoint, c);
    }
    return m.others.get(codepoint);
}
function map_string(m, str) {
    return mapUnicodeChar(str, cp => map_single_char(m, cp));
}
exports.map_string = map_string;
function apply_font(id, str) {
    const m = constants_1.CHAR_MAPPINGS_BY_ID[id];
    if (!m)
        throw new Error(`Unknown font "${id}"!`);
    return map_string(m, str);
}
exports.apply_font = apply_font;
function factory(options) {
}
exports.factory = factory;
/////////////////////
//# sourceMappingURL=index.js.map