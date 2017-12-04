"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const promise_try_1 = require("../promise-try");
const normalize_1 = require("../normalize");
const catch_factory_1 = require("../catch-factory");
const logical_stack_1 = require("./plugins/logical-stack");
const dependency_injection_1 = require("./plugins/dependency-injection");
function isSEC(SEC) {
    return (SEC && SEC[constants_1.INTERNAL_PROP]);
}
function create(args = {}) {
    if (args.parent && !isSEC(args.parent))
        throw new Error(`${constants_1.LIB}›create() argument error: parent must be a valid SEC!`);
    const onError = args.onError || (args.parent && args.parent.onError); // XXX really?
    let SEC = {
        [constants_1.INTERNAL_PROP]: {
            errDecorators: [normalize_1.normalizeError],
            state: {},
            context: {},
        },
        child,
        xTry,
        xTryCatch,
        xPromiseTry,
        xPromiseCatch,
        xPromiseTryCatch,
    };
    // TODO rationalize
    //if (SEC.verbose) console.log(`${LIB}: new SEC:`, args)
    SEC = logical_stack_1.installPluginLogicalStack(SEC, args);
    SEC = dependency_injection_1.installPluginDependencyInjection(SEC, args);
    /////////////////////
    function child(args) {
        // optim for libs which securely enforce a child of provided SEC
        if (isSEC(args) && args[constants_1.INTERNAL_PROP].module && args[constants_1.INTERNAL_PROP].module === SEC[constants_1.INTERNAL_PROP].module) {
            // no need to create a child of oneself
            return SEC;
        }
        return create(Object.assign({}, args, { parent: SEC }));
    }
    /////////////////////
    function xTry(operation, fn) {
        const sub_SEC = SEC.child({ operation });
        const params = Object.assign({}, sub_SEC[constants_1.INTERNAL_PROP].context, { SEC: sub_SEC });
        try {
            return fn(params);
        }
        catch (err) {
            catch_factory_1.createCatcher({
                decorators: sub_SEC[constants_1.INTERNAL_PROP].errDecorators,
                onError: null,
                debugId: 'xTry',
            })(err);
        }
    }
    function xTryCatch(operation, fn) {
        const sub_SEC = SEC.child({ operation });
        const params = Object.assign({}, sub_SEC[constants_1.INTERNAL_PROP].context, { SEC: sub_SEC });
        try {
            return fn(params);
        }
        catch (err) {
            catch_factory_1.createCatcher({
                decorators: sub_SEC[constants_1.INTERNAL_PROP].errDecorators,
                onError,
                debugId: 'xTryCatch',
            })(err);
        }
    }
    function xPromiseCatch(operation, promise) {
        const sub_SEC = SEC.child({ operation });
        return promise
            .catch(catch_factory_1.createCatcher({
            decorators: sub_SEC[constants_1.INTERNAL_PROP].errDecorators,
            onError,
            debugId: 'xTryCatch',
        }));
    }
    function xPromiseTry(operation, fn) {
        const sub_SEC = SEC.child({ operation });
        const params = Object.assign({}, sub_SEC[constants_1.INTERNAL_PROP].context, { SEC: sub_SEC });
        return promise_try_1.promiseTry(() => fn(params))
            .catch(catch_factory_1.createCatcher({
            decorators: sub_SEC[constants_1.INTERNAL_PROP].errDecorators,
            onError: null,
            debugId: 'xPromiseTry',
        }));
    }
    function xPromiseTryCatch(operation, fn) {
        const sub_SEC = SEC.child({ operation });
        const params = Object.assign({}, sub_SEC[constants_1.INTERNAL_PROP].context, { SEC: sub_SEC });
        return promise_try_1.promiseTry(() => fn(params))
            .catch(catch_factory_1.createCatcher({
            decorators: sub_SEC[constants_1.INTERNAL_PROP].errDecorators,
            onError,
            debugId: 'xPromiseTryCatch',
        }));
    }
    return SEC;
}
exports.create = create;
//# sourceMappingURL=core.js.map