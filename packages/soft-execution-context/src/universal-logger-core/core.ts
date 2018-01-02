import { LogLevel, InternalLoggerState, Logger, LoggerParams, Details, Payload, OutputFn } from './types'
import { LEVEL_TO_INTEGER } from './const'
import { get_human_readable_UTC_timestamp_ms_v1 } from '../timestamp'


interface CreateParams extends LoggerParams {
	outputFn?: OutputFn,
}

function createLogger({
	name,
	level = LogLevel.info,
	details = {},
	outputFn = console.log,
}: CreateParams): Logger {
	if (!name)
		throw new Error('universal-logger-core›create(): you must provide a name!')

	const internal_state: InternalLoggerState = {
		name,
		level_enum: level,
		level_int: 0,
		details: {...details},
		output_fn: outputFn,
	}

	const logger: Logger = Object.keys(LEVEL_TO_INTEGER).reduce((logger: any, level: LogLevel) => {
		logger[level] = (message?: string, details?: Details) => {
			if (!isLevelEnabled(level)) return

			if (!details && typeof message === 'object') {
				details = (message as Details)
				message = details.err
					? details.err.message
					: ''
			}
			message = message || ''
			outputFn(serializer(level, message as string, details as Details))
		}
		return logger
	}, {
		_: internal_state,
		isLevelEnabled,
		setLevel,
		getLevel,
		addDetails,
		child,
	}) as Logger

	function setLevel(level: LogLevel) {
		if (!Object.keys(LEVEL_TO_INTEGER).includes(level))
			throw new Error(`Logger core: unknown level "${level}"!`)

		internal_state.level_enum = level
		internal_state.level_int = LEVEL_TO_INTEGER[level]
	}
	setLevel(level)

	function isLevelEnabled(level: LogLevel) {
		return LEVEL_TO_INTEGER[level] >= internal_state.level_int
	}

	function getLevel() {
		return internal_state.level_enum
	}

	function addDetails(details: Details): void {
		internal_state.details = {
			...internal_state.details,
			...details,
		}
	}

	function child({name, level, details}: Partial<LoggerParams>): Logger {
		return createChildLogger({
			parent: logger,
			name,
			level,
			details,
		})
	}

	function serializer(level: LogLevel, msg: string, details: Details): Payload {
		const payload: Payload = {
			details: {
				...internal_state.details,
				...details,
			},
			level,
			name,
			time: get_human_readable_UTC_timestamp_ms_v1(),
			//time: (new Date()).toISOString(),
			msg,
		}

		return payload
	}

	return logger
}

interface ChildCreateParams extends Partial<LoggerParams> {
	parent: Logger
	outputFn?: OutputFn,
}

function createChildLogger({
	parent,
	name = parent._.name,
	level = parent.getLevel(),
	details = {},
	outputFn = parent._.output_fn,
}: ChildCreateParams): Logger {
	details = {
		...parent._.details,
		...details,
	}

	return createLogger({
		name,
		level,
		details,
		outputFn,
	})
}


export {
	createLogger,
	createChildLogger,
}
