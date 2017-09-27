"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe('unicode magic', function () {
    const DEMO_STRING_01a = 'The 23.890 quick brown foxes say: I ❤ 🐓!';
    const DEMO_STRING_01b = DEMO_STRING_01a.toUpperCase();
    describe('change_font()', function () {
        _1.CHAR_MAPPINGS.forEach(m => {
            describe(`font "${m.id}"`, function () {
                it('should work', () => {
                    console.log(_1.apply_font(m.id, DEMO_STRING_01a));
                    console.log(_1.apply_font(m.id, DEMO_STRING_01b));
                });
            });
        });
    });
});
//# sourceMappingURL=index_spec.js.map