"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const universal_logger_core_1 = require("../universal-logger-core");
exports.createChildLogger = universal_logger_core_1.createChildLogger;
const chalk_1 = require("chalk");
const prettyjson = require('prettyjson');
function prettify_json(data, options = {}) {
    return prettyjson.render(data, options);
}
function to_aligned_ascii(level) {
    let lvl = level.toUpperCase();
    if (lvl.length < 5)
        lvl = (lvl + '     ').slice(0, 5);
    return lvl;
}
const LEVEL_TO_ASCII = {
    [universal_logger_core_1.LogLevel.fatal]: to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.fatal]),
    [universal_logger_core_1.LogLevel.emerg]: to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.emerg]),
    [universal_logger_core_1.LogLevel.alert]: to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.alert]),
    [universal_logger_core_1.LogLevel.crit]: to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.crit]),
    [universal_logger_core_1.LogLevel.error]: to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.error]),
    [universal_logger_core_1.LogLevel.warning]: to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.warning]),
    [universal_logger_core_1.LogLevel.warn]: to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.warn]),
    [universal_logger_core_1.LogLevel.notice]: to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.notice]),
    [universal_logger_core_1.LogLevel.info]: to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.info]),
    [universal_logger_core_1.LogLevel.verbose]: to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.verbose]),
    [universal_logger_core_1.LogLevel.log]: to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.log]),
    [universal_logger_core_1.LogLevel.debug]: to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.debug]),
    [universal_logger_core_1.LogLevel.trace]: to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.trace]),
    [universal_logger_core_1.LogLevel.silly]: to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.silly]),
};
function createLogger(p) {
    function outputFn(payload) {
        const { level, name, msg, time, err } = payload, details = tslib_1.__rest(payload, ["level", "name", "msg", "time", "err"]);
        let line = chalk_1.default.dim(''
            + time
            + ' '
            + LEVEL_TO_ASCII[level]
            + ' '
            + name
            + ' '
            + msg
            + ' '
            + prettify_json(details));
        console.log(line);
    }
    return universal_logger_core_1.createLogger(Object.assign({}, p, { outputFn }));
}
exports.createLogger = createLogger;
//# sourceMappingURL=index.js.map