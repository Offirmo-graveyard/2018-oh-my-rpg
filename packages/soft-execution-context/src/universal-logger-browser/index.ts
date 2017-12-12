import {
	LEVEL_TO_HUMAN,
	LogLevel,
	Logger,
	LoggerParams,
	Details,
	Payload,
	OutputFn,
	createLogger as createCoreLogger,
	createChildLogger,
} from '../universal-logger-core'


const LEVEL_TO_CONSOLE_METHOD: { [k: string]: string } = {
	[LogLevel.fatal]:   'error',
	[LogLevel.emerg]:   'error',
	[LogLevel.alert]:   'error',
	[LogLevel.crit]:    'error',

	[LogLevel.error]:   'error',

	[LogLevel.warning]: 'warn',
	[LogLevel.warn]:    'warn',

	[LogLevel.notice]:  'info',
	[LogLevel.info]:    'info',
	[LogLevel.verbose]: 'info',

	[LogLevel.log]:     'log',
	[LogLevel.debug]:   'debug',

	[LogLevel.trace]:   'debug',
	[LogLevel.silly]:   'debug',
}

function createLogger(p: LoggerParams): Logger {

	function outputFn(payload: Payload): void {
		const { level, name, msg, time, details } = payload
		//const { err, ...detailsNoErr } = details
		let line = ''
			+ time
			+ ' '
			+ `[${level}]`
			+ '› '
			+ name
			+ '›'
			+ (msg ? ' ' : '')
			+ msg
		;(console as any)[LEVEL_TO_CONSOLE_METHOD[level]](line, details)
	}

	return createCoreLogger({
		...p,
		outputFn,
	})
}

export {
	createLogger,
	createChildLogger,
}
