"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { LIB, INTERNAL_PROP } = require('../soft-execution-context/constants');
const { createCatcher } = require('../catch-factory');
const { create: createCore } = require('../soft-execution-context/core');
function create(...args) {
    const SEC = createCore(...args);
    // TODO protect from double install
    function listenToUncaughtErrors() {
        if (!SEC[INTERNAL_PROP].module)
            throw new Error(`${LIB}›listenToUncaughtErrors() must only be called in the context of an app! (who are you to mess with globals, lib author??)`);
        const sub_SEC = SEC.child({ operation: '(uncaught error)' });
        process.on('uncaughtException', createCatcher({
            decorators: sub_SEC[INTERNAL_PROP].errDecorators,
            onError: sub_SEC[INTERNAL_PROP].onError,
            debugId: 'node/uncaughtException',
        }));
    }
    function listenToUnhandledRejections() {
        if (!SEC[INTERNAL_PROP].module)
            throw new Error(`${LIB}›listenToUncaughtErrors() must only be called in the context of an app! (who are you to mess with globals, lib author??)`);
        const sub_SEC = SEC.child({ operation: '(unhandled promise rejection)' });
        process.on('unhandledRejection', createCatcher({
            decorators: sub_SEC[INTERNAL_PROP].errDecorators,
            onError: sub_SEC[INTERNAL_PROP].onError,
            debugId: 'node/unhandledRejection',
        }));
    }
    // TODO inject NODE_ENV + overwrite ENV
    // TODO expose a node logger
    return Object.assign({}, SEC, { listenToUncaughtErrors,
        listenToUnhandledRejections });
}
const node = {
    create,
};
exports.node = node;
//# sourceMappingURL=index.js.map