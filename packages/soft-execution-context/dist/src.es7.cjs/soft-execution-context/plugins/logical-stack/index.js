"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const constants_2 = require("./constants");
const fields_1 = require("../../../fields");
function getLogicalStack(module, operation, parentModule, parentFullLStack = constants_2.LOGICAL_STACK_BEGIN_MARKER) {
    if (!module && !parentModule)
        throw new Error(`${constants_1.LIB}: you must provide 'module' to annotate errors with a logical stack!`);
    module = module || parentModule;
    if (!module && !operation)
        throw new Error(`${constants_1.LIB}: you must provide 'module' and/or 'operation' to annotate errors with a logical stack!`);
    let shortLStack = ''
        + constants_2.LOGICAL_STACK_BEGIN_MARKER
        + constants_2.LOGICAL_STACK_MODULE_MARKER
        + module;
    let fullLStack = parentFullLStack;
    if (module !== parentModule)
        fullLStack += ''
            + (parentFullLStack === constants_2.LOGICAL_STACK_BEGIN_MARKER ? '' : constants_2.LOGICAL_STACK_SEPARATOR)
            + constants_2.LOGICAL_STACK_MODULE_MARKER
            + module;
    if (operation) {
        fullLStack += ''
            + constants_2.LOGICAL_STACK_SEPARATOR
            + operation
            + constants_2.LOGICAL_STACK_OPERATION_MARKER;
        shortLStack += ''
            + constants_2.LOGICAL_STACK_SEPARATOR
            + operation
            + constants_2.LOGICAL_STACK_OPERATION_MARKER;
    }
    return {
        short: shortLStack,
        full: fullLStack,
    };
}
function installPluginLogicalStack(SEC, { module, operation, parent }) {
    // TODO check params
    // inherit some stuff from our parent
    if (parent) {
        module = module || parent[constants_1.INTERNAL_PROP].module;
    }
    if (parent && !parent[constants_1.INTERNAL_PROP].logicalStack) {
        console.log('UHHH?');
    }
    const logicalStack = getLogicalStack(module, operation, parent ? parent[constants_1.INTERNAL_PROP].module : undefined, parent ? parent[constants_1.INTERNAL_PROP].logicalStack.full : undefined);
    SEC[constants_1.INTERNAL_PROP].errDecorators.push(function attachLogicalStack(err) {
        if (err.logicalStack) {
            // OK this error is already decorated.
            // message already decorated, don't touch
            // can we add more info?
            if (err.logicalStack.includes(logicalStack.full)) {
                // ok, already chained
            }
            else {
                // TOTEST
                err.logicalStack = logicalStack.full + constants_2.LOGICAL_STACK_SEPARATOR_NON_ADJACENT + err.logicalStack;
            }
        }
        else {
            if (!err.message.startsWith(logicalStack.short))
                err.message = logicalStack.short + constants_2.LOGICAL_STACK_END_MARKER + ' ' + err.message;
            err.logicalStack = logicalStack.full;
        }
        return err;
    });
    fields_1.ERROR_FIELDS.add('logicalStack');
    SEC[constants_1.INTERNAL_PROP].module = module;
    SEC[constants_1.INTERNAL_PROP].operation = operation;
    SEC[constants_1.INTERNAL_PROP].logicalStack = logicalStack;
    return SEC;
}
exports.installPluginLogicalStack = installPluginLogicalStack;
//# sourceMappingURL=index.js.map