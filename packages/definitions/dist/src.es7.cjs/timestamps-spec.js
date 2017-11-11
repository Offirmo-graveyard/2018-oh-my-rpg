"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe('timestamps', function () {
    describe('get_UTC_timestamp_ms()', function () {
        it('should return correct UTC unix timestamps in ms', function () {
            for (let i = 0; i < 10; ++i) {
                const stamp = _1.get_UTC_timestamp_ms();
                console.log(stamp);
                expect(stamp).to.be.a('number');
                expect(stamp).to.be.within(1510177449000, // 2017
                4665851049000 // 2117
                );
            }
        });
    });
    describe('get_human_readable_UTC_timestamp_ms()', function () {
        it('should return correct UTC timestamps', function () {
            for (let i = 0; i < 10; ++i) {
                const stamp = _1.get_human_readable_UTC_timestamp_ms();
                console.log(stamp);
                expect(stamp).to.be.a('string');
            }
        });
    });
});
//# sourceMappingURL=timestamps-spec.js.map