import { LogLevel } from './types'

const LEVEL_TO_INTEGER: { [k: string]: number } = {
	[LogLevel.fatal]:   60,
	[LogLevel.emerg]:   59,

	[LogLevel.alert]:   52,
	[LogLevel.crit]:    51,
	[LogLevel.error]:   50,

	[LogLevel.warning]: 40,
	[LogLevel.warn]:    40,

	[LogLevel.notice]:  35,

	[LogLevel.info]:    30,

	[LogLevel.verbose]: 22,
	[LogLevel.log]:     21,
	[LogLevel.debug]:   20,

	[LogLevel.trace]:   10,

	[LogLevel.silly]:    5,
}

// level to short, meaningful string to maybe be displayed on screen
const LEVEL_TO_HUMAN: { [k: string]: string } = {
	[LogLevel.fatal]:   'fatal',
	[LogLevel.emerg]:   'emergency',

	[LogLevel.alert]:   'alert',
	[LogLevel.crit]:    'critical',
	[LogLevel.error]:   'error',

	[LogLevel.warning]: 'warn',
	[LogLevel.warn]:    'warn',

	[LogLevel.notice]:  'note',

	[LogLevel.info]:    'info',

	[LogLevel.verbose]: 'verbose',
	[LogLevel.log]:     'log',
	[LogLevel.debug]:   'debug',

	[LogLevel.trace]:   'trace',

	[LogLevel.silly]:   'silly',
}

export {
	LEVEL_TO_INTEGER,
	LEVEL_TO_HUMAN,
}
