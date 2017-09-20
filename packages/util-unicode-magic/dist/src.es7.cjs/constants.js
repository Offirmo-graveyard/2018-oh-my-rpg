"use strict";
////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
////////////////////////////////////
const CHAR_MAPPINGS = [
    {
        id: 'EnclosedLight',
        alphabet_upper: 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ',
        alphabet_lower: 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ',
        numbers: '⓪①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳',
        other: {},
    },
];
exports.CHAR_MAPPINGS = CHAR_MAPPINGS;
const CHAR_MAPPINGS_BY_ID = CHAR_MAPPINGS.reduce((acc, mapping) => {
    acc[mapping.id] = mapping;
    return acc;
}, {});
exports.CHAR_MAPPINGS_BY_ID = CHAR_MAPPINGS_BY_ID;
////////////////////////////////////
//# sourceMappingURL=constants.js.map