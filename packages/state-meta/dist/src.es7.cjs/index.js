"use strict";
/////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4 = require("uuid/v4");
/////////////////////
const DEFAULT_NAME = 'anonymous';
exports.DEFAULT_NAME = DEFAULT_NAME;
///////
function factory() {
    return {
        uuid: uuidv4(),
        name: DEFAULT_NAME,
        email: null,
        allow_telemetry: true,
    };
}
exports.factory = factory;
/////////////////////
function rename(state, new_name) {
    if (!new_name)
        throw new Error(`Error while renaming to "${new_name}: invalid value!`);
    state.name = new_name;
    return state;
}
exports.rename = rename;
function set_email(state, email) {
    if (!email)
        throw new Error(`Error while setting mail to "${email}: invalid value!`);
    state.email = email;
    return state;
}
exports.set_email = set_email;
/////////////////////
//# sourceMappingURL=index.js.map