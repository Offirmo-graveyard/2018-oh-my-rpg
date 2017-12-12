"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const _1 = require(".");
describe('generate_uuid()', function () {
    it('should return correct uuids', function () {
        for (let i = 0; i < 10; ++i) {
            const uuid = _1.generate_uuid();
            console.log(uuid);
            chai_1.expect(uuid).to.be.a('string');
            chai_1.expect(uuid).to.have.lengthOf(_1.UUID_LENGTH);
            chai_1.expect(uuid.startsWith(('uu1'))).to.be.true;
        }
    });
});
//# sourceMappingURL=generate_uuid_spec.js.map