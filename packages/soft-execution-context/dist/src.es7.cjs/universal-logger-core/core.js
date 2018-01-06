"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const const_1 = require("./const");
const timestamp_1 = require("../timestamp"); // TODO export it
function checkLevel() {
}
function createLogger({ name, level = types_1.LogLevel.info, details = {}, outputFn = console.log, }) {
    if (!name)
        throw new Error('universal-logger-core›create(): you must provide a name!');
    const internal_state = {
        name,
        level,
        details: Object.assign({}, details),
        outputFn: outputFn,
    };
    let level_int = 0;
    const logger = Object.keys(const_1.LEVEL_TO_INTEGER).reduce((logger, level) => {
        logger[level] = (message, details) => {
            if (!isLevelEnabled(level))
                return;
            if (!details && typeof message === 'object') {
                details = message;
                message = details.err
                    ? details.err.message
                    : '';
            }
            message = message || '';
            outputFn(serializer(level, message, details));
        };
        return logger;
    }, {
        _: internal_state,
        isLevelEnabled,
        setLevel,
        getLevel,
        addDetails,
        child,
    });
    function setLevel(level) {
        if (!const_1.ALL_LOG_LEVELS.includes(level))
            throw new Error(`Logger core: unknown level "${level}"!`);
        internal_state.level = level;
        level_int = const_1.LEVEL_TO_INTEGER[level];
    }
    setLevel(level);
    function isLevelEnabled(level) {
        return const_1.LEVEL_TO_INTEGER[level] >= level_int;
    }
    function getLevel() {
        return internal_state.level;
    }
    function addDetails(details) {
        internal_state.details = Object.assign({}, internal_state.details, details);
    }
    // TODO check
    function child({ name, level, details }) {
        return createChildLogger({
            parent: logger,
            name,
            level,
            details,
        });
    }
    function serializer(level, msg, details) {
        const payload = {
            details: Object.assign({}, internal_state.details, details),
            level,
            name,
            time: timestamp_1.get_human_readable_UTC_timestamp_ms_v1(),
            //time: (new Date()).toISOString(),
            msg,
        };
        return payload;
    }
    return logger;
}
exports.createLogger = createLogger;
function createChildLogger({ parent, name = parent._.name, level = parent.getLevel(), details = {}, outputFn = parent._.outputFn, }) {
    details = Object.assign({}, parent._.details, details);
    return createLogger({
        name,
        level,
        details,
        outputFn,
    });
}
exports.createChildLogger = createChildLogger;
//# sourceMappingURL=core.js.map