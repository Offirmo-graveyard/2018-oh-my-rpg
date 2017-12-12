"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const universal_logger_core_1 = require("../universal-logger-core");
exports.createChildLogger = universal_logger_core_1.createChildLogger;
const display_ansi_1 = require("../display-ansi");
const chalk_1 = require("chalk");
const prettyjson = require('prettyjson');
function prettifyJson(data) {
    return prettyjson.render(data, {
        keysColor: 'dim',
    });
}
const MIN_WIDTH = 7;
function to_aligned_ascii(level) {
    let lvl = level.toUpperCase();
    /*while (lvl.length <= MIN_WIDTH - 2) {
        lvl = ' ' + lvl + ' '
    }*/
    if (lvl.length < MIN_WIDTH)
        lvl = (lvl + '         ').slice(0, MIN_WIDTH);
    return lvl;
}
const LEVEL_TO_ASCII = {
    [universal_logger_core_1.LogLevel.fatal]: chalk_1.default.bgRed.white.bold(to_aligned_ascii(' ' + universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.fatal])),
    [universal_logger_core_1.LogLevel.emerg]: chalk_1.default.bgRed.white.bold(to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.emerg])),
    [universal_logger_core_1.LogLevel.alert]: chalk_1.default.bgRed.white.bold(to_aligned_ascii(' ' + universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.alert])),
    [universal_logger_core_1.LogLevel.crit]: chalk_1.default.bgRed.white.bold(to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.crit])),
    [universal_logger_core_1.LogLevel.error]: chalk_1.default.red.bold(to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.error])),
    [universal_logger_core_1.LogLevel.warning]: chalk_1.default.yellow.bold(to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.warning])),
    [universal_logger_core_1.LogLevel.warn]: chalk_1.default.yellow.bold(to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.warn])),
    [universal_logger_core_1.LogLevel.notice]: chalk_1.default.blue(to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.notice])),
    [universal_logger_core_1.LogLevel.info]: chalk_1.default.blue(to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.info])),
    [universal_logger_core_1.LogLevel.verbose]: to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.verbose]),
    [universal_logger_core_1.LogLevel.log]: to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.log]),
    [universal_logger_core_1.LogLevel.debug]: to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.debug]),
    [universal_logger_core_1.LogLevel.trace]: chalk_1.default.dim(to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.trace])),
    [universal_logger_core_1.LogLevel.silly]: chalk_1.default.dim(to_aligned_ascii(universal_logger_core_1.LEVEL_TO_HUMAN[universal_logger_core_1.LogLevel.silly])),
};
const LEVEL_TO_COLORIZE_BODY = {
    [universal_logger_core_1.LogLevel.fatal]: s => chalk_1.default.red.bold(s),
    [universal_logger_core_1.LogLevel.emerg]: s => chalk_1.default.red.bold(s),
    [universal_logger_core_1.LogLevel.alert]: s => chalk_1.default.red.bold(s),
    [universal_logger_core_1.LogLevel.crit]: s => chalk_1.default.red.bold(s),
    [universal_logger_core_1.LogLevel.error]: s => chalk_1.default.red.bold(s),
    [universal_logger_core_1.LogLevel.warning]: s => chalk_1.default.yellow(s),
    [universal_logger_core_1.LogLevel.warn]: s => chalk_1.default.yellow(s),
    [universal_logger_core_1.LogLevel.notice]: s => chalk_1.default.blue(s),
    [universal_logger_core_1.LogLevel.info]: s => chalk_1.default.blue(s),
    [universal_logger_core_1.LogLevel.verbose]: s => s,
    [universal_logger_core_1.LogLevel.log]: s => s,
    [universal_logger_core_1.LogLevel.debug]: s => s,
    [universal_logger_core_1.LogLevel.trace]: s => chalk_1.default.dim(s),
    [universal_logger_core_1.LogLevel.silly]: s => chalk_1.default.dim(s),
};
function createLogger(p) {
    function outputFn(payload) {
        const { level, name, msg, time, details } = payload;
        const { err } = details, detailsNoErr = tslib_1.__rest(details, ["err"]);
        let line = ''
            + chalk_1.default.dim(time)
            + ' '
            + LEVEL_TO_ASCII[level]
            + '› '
            + LEVEL_TO_COLORIZE_BODY[level](''
                + name
                + '›'
                + (msg ? ' ' : '')
                + msg
                + ' '
                + prettifyJson(detailsNoErr));
        console.log(line);
        if (err)
            display_ansi_1.displayError(err);
    }
    return universal_logger_core_1.createLogger(Object.assign({}, p, { outputFn }));
}
exports.createLogger = createLogger;
//# sourceMappingURL=index.js.map