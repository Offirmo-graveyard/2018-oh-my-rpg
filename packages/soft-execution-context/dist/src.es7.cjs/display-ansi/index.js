"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const fields_1 = require("../fields");
function displayErrProp(errLike, prop) {
    console.error(chalk_1.default.red(chalk_1.default.dim(`🔥  ${prop}: "`) + errLike[prop] + chalk_1.default.dim('"')));
}
function displayError(errLike = {}) {
    console.error(chalk_1.default.red(`🔥🔥🔥🔥🔥🔥🔥  ${chalk_1.default.bold(errLike.name || 'Error')} 🔥🔥🔥🔥🔥🔥🔥`));
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