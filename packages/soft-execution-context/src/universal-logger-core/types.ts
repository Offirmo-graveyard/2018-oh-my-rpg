import { Enum } from 'typescript-string-enums'

const LogLevel = Enum(
	'alert',
	'crit',
	'debug',
	'emerg',
	'error',
	'fatal',
	'info',
	'log',
	'notice',
	'silly',
	'trace',
	'verbose',
	'warn',
	'warning',
)
type LogLevel = Enum<typeof LogLevel>

type Details = { [k: string]: any}
type LogFn = (message: string, details: Details) => void
type OutputFn = (payload: Payload) => void

interface LoggerParams {
	name: string
	level?: LogLevel
	details?: Details
}

interface InternalLoggerState {
	name: string
	level_enum: LogLevel
	level_int: number
	details: Details
	output_fn: OutputFn
}

interface Logger {
	_: InternalLoggerState

	child: (p: Partial<LoggerParams>) => Logger
	isLevelEnabled: (level: LogLevel) => boolean
	setLevel: (level: LogLevel) => void
	getLevel: () => LogLevel

	addDetails: (hash: Details) => void

	alert: LogFn,
	crit: LogFn,
	debug: LogFn,
	emerg: LogFn,
	error: LogFn,
	fatal: LogFn,
	info: LogFn,
	log: LogFn,
	notice: LogFn,
	silly: LogFn,
	trace: LogFn,
	verbose: LogFn,
	warn: LogFn,
	warning: LogFn,
}

// inspired by:
// https://github.com/trentm/node-bunyan#core-fields
interface Payload {
	level: LogLevel
	name: string
	msg: string
	time: string
	err?: Error,

	[k: string]: any
}


export {
	Details,
	LogLevel,
	LogFn,
	OutputFn,
	InternalLoggerState,
	Logger,
	LoggerParams,
	Payload,
}
