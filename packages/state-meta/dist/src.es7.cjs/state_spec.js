"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
const _1 = require(".");
describe('🤕 ❤️  Meta state - reducer', function () {
    describe('🆕  initial state', function () {
        const TEST_UUID_v4 = 'a8870798-5cf1-4af2-b799-9fbcfcd2ac7a';
        it('should have correct defaults and a unique uuid', function () {
            let state = _1.factory();
            // uuid is random
            expect(state.uuid).to.have.lengthOf(TEST_UUID_v4.length);
            state = Object.assign({}, state, { uuid: TEST_UUID_v4 });
            expect(state).to.deep.equal({
                schema_version: consts_1.SCHEMA_VERSION,
                revision: 0,
                uuid: TEST_UUID_v4,
                name: 'anonymous',
                email: null,
                allow_telemetry: true,
            });
        });
    });
});
//# sourceMappingURL=state_spec.js.map