"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loggers_types_and_stubs_1 = require("@offirmo/loggers-types-and-stubs");
const constants_1 = require("../../constants");
function installPluginDependencyInjection(SEC, args) {
    const { parent, context } = args;
    // TODO check params
    // TODO report handled params
    // inherit some stuff from our parent
    if (parent) {
        SEC[constants_1.INTERNAL_PROP].context = Object.assign({}, parent[constants_1.INTERNAL_PROP].context, SEC[constants_1.INTERNAL_PROP].context);
    }
    const toInject = Object.assign({ 
        // TODO check conflicts?
        logger: SEC[constants_1.INTERNAL_PROP].context.logger || loggers_types_and_stubs_1.compatibleLoggerToVoid, ENV: SEC[constants_1.INTERNAL_PROP].context.ENV || 'production' }, context, { logicalStack: SEC[constants_1.INTERNAL_PROP].logicalStack, debugId: SEC[constants_1.INTERNAL_PROP].logicalStack.short });
    SEC[constants_1.INTERNAL_PROP].context = Object.assign({}, SEC[constants_1.INTERNAL_PROP].context, toInject);
    //SEC.context.logger.log('test foo')
    return SEC;
}
exports.installPluginDependencyInjection = installPluginDependencyInjection;
//# sourceMappingURL=index.js.map