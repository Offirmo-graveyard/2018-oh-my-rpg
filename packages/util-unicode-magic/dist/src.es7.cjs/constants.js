"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
////////////////////////////////////
const punycode = require("punycode");
////////////////////////////////////
const ENCLOSED_LIGHT = {
    id: 'EnclosedLight',
    alphabet_upper: punycode.ucs2.decode('ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ'),
    alphabet_lower: punycode.ucs2.decode('ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'),
    numbers: punycode.ucs2.decode('⓪①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳'),
    others: new Map()
};
ENCLOSED_LIGHT.others.set('0'.codePointAt(0), '⓪');
// Greek and Coptic http://jrgraphix.net/r/Unicode/0370-03FF
// 13A0-13FF
const CHEROKEE = {
    id: 'Cherokee',
    alphabet_upper: undefined,
    alphabet_lower: undefined,
    numbers: undefined,
    others: new Map()
};
CHEROKEE.others.set('4'.codePointAt(0), 'Ꮞ');
CHEROKEE.others.set('6'.codePointAt(0), 'Ꮾ');
CHEROKEE.others.set('9'.codePointAt(0), 'Ꮽ');
CHEROKEE.others.set('A'.codePointAt(0), 'Ꭺ');
CHEROKEE.others.set('b'.codePointAt(0), 'Ꮟ');
CHEROKEE.others.set('B'.codePointAt(0), 'Ᏼ');
CHEROKEE.others.set('C'.codePointAt(0), 'Ꮯ');
CHEROKEE.others.set('D'.codePointAt(0), 'Ꭰ');
CHEROKEE.others.set('E'.codePointAt(0), 'Ꭼ');
CHEROKEE.others.set('G'.codePointAt(0), 'Ꮐ');
CHEROKEE.others.set('H'.codePointAt(0), 'Ꮋ');
CHEROKEE.others.set('h'.codePointAt(0), 'Ꮒ');
CHEROKEE.others.set('J'.codePointAt(0), 'Ꭻ');
CHEROKEE.others.set('K'.codePointAt(0), 'Ꮶ');
CHEROKEE.others.set('L'.codePointAt(0), 'Ꮮ');
CHEROKEE.others.set('M'.codePointAt(0), 'Ꮇ');
CHEROKEE.others.set('O'.codePointAt(0), 'Ꮎ');
CHEROKEE.others.set('P'.codePointAt(0), 'Ꮲ');
CHEROKEE.others.set('R'.codePointAt(0), 'Ꭱ');
CHEROKEE.others.set('S'.codePointAt(0), 'Ꮪ');
CHEROKEE.others.set('T'.codePointAt(0), 'Ꭲ');
CHEROKEE.others.set('V'.codePointAt(0), 'Ꮩ');
CHEROKEE.others.set('W'.codePointAt(0), 'Ꮃ');
CHEROKEE.others.set('y'.codePointAt(0), 'Ꭹ');
CHEROKEE.others.set('Z'.codePointAt(0), 'Ꮓ');
const MATH_01 = {
    id: 'Math01',
    alphabet_upper: punycode.ucs2.decode('𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙'),
    alphabet_lower: punycode.ucs2.decode('𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳'),
    numbers: punycode.ucs2.decode('𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵'),
    others: new Map()
};
// +++ Math http://jrgraphix.net/r/Unicode/1D400-1D7FF
/*
1f170 "⋄🅰⋄"
1f171 "⋄🅱⋄"
1f172 "⋄🅲⋄"
1f173 "⋄🅳⋄"
1f174 "⋄🅴⋄"
1f175 "⋄🅵⋄"
1f176 "⋄🅶⋄"
1f177 "⋄🅷⋄"
1f178 "⋄🅸⋄"
1f179 "⋄🅹⋄"
1f17a "⋄🅺⋄"
1f17b "⋄🅻⋄"
1f17c "⋄🅼⋄"
1f17d "⋄🅽⋄"
1f17e "⋄🅾⋄"
1f17f "⋄🅿⋄"
1f180 "⋄🆀⋄"
1f181 "⋄🆁⋄"
1f182 "⋄🆂⋄"
1f183 "⋄🆃⋄"
1f184 "⋄🆄⋄"
1f185 "⋄🆅⋄"
1f186 "⋄🆆⋄"
1f187 "⋄🆇⋄"
1f188 "⋄🆈⋄"
1f189 "⋄🆉⋄"
 */
// "form" http://jrgraphix.net/r/Unicode/FF00-FFEF
// old italic http://jrgraphix.net/r/Unicode/10300-1032F
// canadian aborigenals http://jrgraphix.net/r/Unicode/1400-167F
// phonetic extensions http://jrgraphix.net/r/Unicode/1D00-1D7F
// subscripts http://jrgraphix.net/r/Unicode/2070-209F
// letter-like http://jrgraphix.net/r/Unicode/2100-214F
// stargate? http://jrgraphix.net/r/Unicode/27C0-27EF
// TODO combining? http://jrgraphix.net/r/Unicode/20D0-20FF
const CHAR_MAPPINGS = [
    ENCLOSED_LIGHT,
    CHEROKEE,
    MATH_01,
];
exports.CHAR_MAPPINGS = CHAR_MAPPINGS;
const CHAR_MAPPINGS_BY_ID = CHAR_MAPPINGS.reduce((acc, mapping) => {
    acc[mapping.id] = mapping;
    return acc;
}, {});
exports.CHAR_MAPPINGS_BY_ID = CHAR_MAPPINGS_BY_ID;
////////////////////////////////////
//# sourceMappingURL=constants.js.map