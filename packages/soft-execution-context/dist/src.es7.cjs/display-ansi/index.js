"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fields_1 = require("../fields");
function displayErrProp(errLike, prop) {
    console.error(`🔥  ${prop}: "${errLike[prop]}"`);
}
function displayError(errLike = {}) {
    console.error(`🔥🔥🔥🔥🔥🔥🔥  ${errLike.name || 'Error'} 🔥🔥🔥🔥🔥🔥🔥`);
    const displayedProps = new Set();
    displayedProps.add('name');
    if (errLike.message) {
        displayErrProp(errLike, 'message');
        displayedProps.add('message');
    }
    if (errLike.logicalStack) {
        displayErrProp(errLike, 'logicalStack');
        displayedProps.add('logicalStack');
    }
    fields_1.ERROR_FIELDS.forEach(prop => {
        if (prop in errLike && !displayedProps.has(prop))
            displayErrProp(errLike, prop);
    });
}
exports.displayError = displayError;
//# sourceMappingURL=index.js.map