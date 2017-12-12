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
const LEVEL_TO_STYLE = {
    [universal_logger_core_1.LogLevel.fatal]: '',
    [universal_logger_core_1.LogLevel.emerg]: '',
    [universal_logger_core_1.LogLevel.alert]: '',
    [universal_logger_core_1.LogLevel.crit]: '',
    [universal_logger_core_1.LogLevel.error]: '',
    [universal_logger_core_1.LogLevel.warning]: '',
    [universal_logger_core_1.LogLevel.warn]: '',
    [universal_logger_core_1.LogLevel.notice]: 'color: #659AD2',
    [universal_logger_core_1.LogLevel.info]: 'color: #659AD2',
    [universal_logger_core_1.LogLevel.verbose]: 'color: #659AD2',
    [universal_logger_core_1.LogLevel.log]: '',
    [universal_logger_core_1.LogLevel.debug]: '',
    [universal_logger_core_1.LogLevel.trace]: 'color: #9AA2AA',
    [universal_logger_core_1.LogLevel.silly]: 'color: #9AA2AA',
};
function createLogger(p) {
    function outputFn(payload) {
        const { level, name, msg, time, details } = payload;
        //const { err, ...detailsNoErr } = details
        let line = ''
            //+ time
            //+ ' '
            + `%c[${level}]`
            + '›'
            + name
            + '›'
            //+ (msg ? ' ' : '')
            + msg;
        if (Object.keys(details).length)
            console[LEVEL_TO_CONSOLE_METHOD[level]](line, LEVEL_TO_STYLE[level], details);
        else
            console[LEVEL_TO_CONSOLE_METHOD[level]](line, LEVEL_TO_STYLE[level]);
    }
    return universal_logger_core_1.createLogger(Object.assign({}, p, { outputFn }));
}
exports.createLogger = createLogger;
//# sourceMappingURL=index.js.map