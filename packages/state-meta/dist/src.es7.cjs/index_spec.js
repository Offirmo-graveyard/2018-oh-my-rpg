"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe('🤕 ❤️  Meta logic', function () {
    describe('🆕  initial state', function () {
        it('should have correct defaults and a unique uuid', function () {
            const state = _1.factory();
            expect(state).to.deep.equal({
                //uuid: 'unknown',
                name: 'anonymous',
                email: null,
                allow_telemetry: true,
            });
        });
    });
});
//# sourceMappingURL=index_spec.js.map