"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const LEVEL_TO_INTEGER = {
    [types_1.LogLevel.fatal]: 60,
    [types_1.LogLevel.emerg]: 59,
    [types_1.LogLevel.alert]: 52,
    [types_1.LogLevel.crit]: 51,
    [types_1.LogLevel.error]: 50,
    [types_1.LogLevel.warning]: 40,
    [types_1.LogLevel.warn]: 40,
    [types_1.LogLevel.notice]: 35,
    [types_1.LogLevel.info]: 30,
    [types_1.LogLevel.verbose]: 22,
    [types_1.LogLevel.log]: 21,
    [types_1.LogLevel.debug]: 20,
    [types_1.LogLevel.trace]: 10,
    [types_1.LogLevel.silly]: 5,
};
exports.LEVEL_TO_INTEGER = LEVEL_TO_INTEGER;
// level to short, meaningful string to maybe be displayed on screen
const LEVEL_TO_HUMAN = {
    [types_1.LogLevel.fatal]: 'fatal',
    [types_1.LogLevel.emerg]: 'emergency',
    [types_1.LogLevel.alert]: 'alert',
    [types_1.LogLevel.crit]: 'critical',
    [types_1.LogLevel.error]: 'error',
    [types_1.LogLevel.warning]: 'warn',
    [types_1.LogLevel.warn]: 'warn',
    [types_1.LogLevel.notice]: 'notice',
    [types_1.LogLevel.info]: 'info',
    [types_1.LogLevel.verbose]: 'verbose',
    [types_1.LogLevel.log]: 'log',
    [types_1.LogLevel.debug]: 'debug',
    [types_1.LogLevel.trace]: 'trace',
    [types_1.LogLevel.silly]: 'silly',
};
exports.LEVEL_TO_HUMAN = LEVEL_TO_HUMAN;
//# sourceMappingURL=const.js.map