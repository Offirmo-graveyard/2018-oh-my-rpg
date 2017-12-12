"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const universal_logger_core_1 = require("../universal-logger-core");
exports.createChildLogger = universal_logger_core_1.createChildLogger;
const LEVEL_TO_CONSOLE_METHOD = {
    [universal_logger_core_1.LogLevel.fatal]: 'error',
    [universal_logger_core_1.LogLevel.emerg]: 'error',
    [universal_logger_core_1.LogLevel.alert]: 'error',
    [universal_logger_core_1.LogLevel.crit]: 'error',
    [universal_logger_core_1.LogLevel.error]: 'error',
    [universal_logger_core_1.LogLevel.warning]: 'warn',
    [universal_logger_core_1.LogLevel.warn]: 'warn',
    [universal_logger_core_1.LogLevel.notice]: 'info',
    [universal_logger_core_1.LogLevel.info]: 'info',
    [universal_logger_core_1.LogLevel.verbose]: 'info',
    [universal_logger_core_1.LogLevel.log]: 'log',
    [universal_logger_core_1.LogLevel.debug]: 'debug',
    [universal_logger_core_1.LogLevel.trace]: 'debug',
    [universal_logger_core_1.LogLevel.silly]: 'debug',
};
function createLogger(p) {
    function outputFn(payload) {
        const { level, name, msg, time, details } = payload;
        //const { err, ...detailsNoErr } = details
        let line = ''
            + time
            + ' '
            + `[${level}]`
            + '› '
            + name
            + '›'
            + (msg ? ' ' : '')
            + msg;
        console[LEVEL_TO_CONSOLE_METHOD[level]](line, details);
    }
    return universal_logger_core_1.createLogger(Object.assign({}, p, { outputFn }));
}
exports.createLogger = createLogger;
//# sourceMappingURL=index.js.map