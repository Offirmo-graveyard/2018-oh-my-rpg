"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const universal_logger_core_1 = require("../../../universal-logger-core");
function installPluginDependencyInjection(SEC, args) {
    const { parent } = args;
    let { context = {}, contextGenerators = {} } = args;
    // TODO check params
    // TODO report handled params
    // inherit some stuff from our parent, but at lower priority
    if (parent) {
        // TODO check conflicts?
        // inherit intelligently those one:
        const logLevel = context.logLevel || (parent[constants_1.INTERNAL_PROP].LS.logicalStack.short === SEC[constants_1.INTERNAL_PROP].LS.logicalStack.short
            ? parent[constants_1.INTERNAL_PROP].DI.context.logLevel
            : 'error');
        const logger = context.logger || parent[constants_1.INTERNAL_PROP].DI.context.logger.child({
            name: SEC[constants_1.INTERNAL_PROP].LS.logicalStack.short,
            logLevel,
            details: {}
        });
        context = Object.assign({}, parent[constants_1.INTERNAL_PROP].DI.context, context, { logLevel,
            logger });
        contextGenerators = Object.assign({}, parent[constants_1.INTERNAL_PROP].contextGenerators, contextGenerators);
    }
    else {
        // provide defaults to overridable props
        context = Object.assign({ env: 'development', logger: universal_logger_core_1.createLogger({
                name: SEC[constants_1.INTERNAL_PROP].LS.logicalStack.short,
                level: context.logLevel,
            }), logLevel: context.logger
                ? context.logger.getLevel()
                : 'error' }, context);
    }
    // inject non-overridable ones
    context = Object.assign({}, context, { logicalStack: SEC[constants_1.INTERNAL_PROP].LS.logicalStack, tracePrefix: SEC[constants_1.INTERNAL_PROP].LS.logicalStack.short });
    // build generated values
    Object.keys(contextGenerators).forEach(key => {
        context[key] = contextGenerators[key](context);
    });
    // TODO check non-overridable ?
    // TODO deep freeze ?
    SEC[constants_1.INTERNAL_PROP].DI = {
        context,
        contextGenerators,
    };
    //SEC.context.logger.log('test foo')
    return SEC;
}
exports.installPluginDependencyInjection = installPluginDependencyInjection;
//# sourceMappingURL=index.js.map