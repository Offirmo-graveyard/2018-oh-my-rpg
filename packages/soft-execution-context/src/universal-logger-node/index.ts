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

import { displayError } from '../display-ansi'

import chalk from 'chalk'
const prettyjson = require('prettyjson')
function prettify_json(data: any, options = {}) {
	return prettyjson.render(data, options)
}

function to_aligned_ascii(level: string): string {
	let lvl = level.toUpperCase()
	if (lvl.length < 5)
		lvl = (lvl + '     ').slice(0, 5)
	return lvl
}

const LEVEL_TO_ASCII: { [k: string]: string } = {
	[LogLevel.fatal]:   to_aligned_ascii(LEVEL_TO_HUMAN[LogLevel.fatal]),
	[LogLevel.emerg]:   to_aligned_ascii(LEVEL_TO_HUMAN[LogLevel.emerg]),

	[LogLevel.alert]:   to_aligned_ascii(LEVEL_TO_HUMAN[LogLevel.alert]),
	[LogLevel.crit]:    to_aligned_ascii(LEVEL_TO_HUMAN[LogLevel.crit]),
	[LogLevel.error]:   to_aligned_ascii(LEVEL_TO_HUMAN[LogLevel.error]),

	[LogLevel.warning]: to_aligned_ascii(LEVEL_TO_HUMAN[LogLevel.warning]),
	[LogLevel.warn]:    to_aligned_ascii(LEVEL_TO_HUMAN[LogLevel.warn]),

	[LogLevel.notice]:  to_aligned_ascii(LEVEL_TO_HUMAN[LogLevel.notice]),

	[LogLevel.info]:    to_aligned_ascii(LEVEL_TO_HUMAN[LogLevel.info]),

	[LogLevel.verbose]: to_aligned_ascii(LEVEL_TO_HUMAN[LogLevel.verbose]),
	[LogLevel.log]:     to_aligned_ascii(LEVEL_TO_HUMAN[LogLevel.log]),
	[LogLevel.debug]:   to_aligned_ascii(LEVEL_TO_HUMAN[LogLevel.debug]),

	[LogLevel.trace]:   to_aligned_ascii(LEVEL_TO_HUMAN[LogLevel.trace]),

	[LogLevel.silly]:   to_aligned_ascii(LEVEL_TO_HUMAN[LogLevel.silly]),
}

function createLogger(p: LoggerParams): Logger {

	function outputFn(payload: Payload): void {
		const { level, name, msg, time, err, ...details } = payload
		let line = chalk.dim(''
			+ time
			+ ' '
			+ LEVEL_TO_ASCII[level]
			+ ' '
			+ name
			+ ' '
			+ msg
			+ ' '
			+ prettify_json(details)
		)
		console.log(line)
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
