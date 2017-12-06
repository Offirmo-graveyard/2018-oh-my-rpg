#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"
"use strict";

//const { compatibleLoggerToConsole } = require('@offirmo/loggers-types-and-stubs')

const APP = 'SEC_DEMO_01'

console.log(`${APP} starting...`)

const prettyjson = require('prettyjson')

function prettify_json(data, options) {
	return prettyjson.render(data, options)
}

const ROOT = '../dist/src.es7.cjs/'

const soft_execution_context = require(ROOT + 'soft-execution-context-node')
const {displayError} = require(ROOT + 'display-ansi')
const { createLogger } = require(ROOT + 'universal-logger-node')

function onError(err) {
	displayError(err)
	//console.error('🔥  error,', prettify_json(err))
}

const SEC = soft_execution_context.node.create({
	module: APP,
	onError,
	context: {
		logger: createLogger({
			name: APP,
			level: 'trace',
		})
	},
	/*contextGenerators: {
		logger: ({tracePrefix, env, logger}) => {
			console.log('log gen', {tracePrefix, env, logger: !!logger})
			return compatibleLoggerToConsole
		}
	}*/
})
soft_execution_context.setRoot(SEC)

SEC.listenToUncaughtErrors()
SEC.listenToUnhandledRejections()

const bad_lib = require('./bad_lib')
const intercepting_lib = require('./intercepting_lib')

/*
SEC.xTryCatch('starting', function start({SEC}) {
	console.log('starting...')
	//throw new Error('Foo')
	const good_lib = require('./good_lib').create({SEC})

	//SEC.xTry('calling bad lib', () => bad_lib.foo_sync())
	//SEC.xTry('calling good lib', () => good_lib.foo_sync())
	SEC.xTry('calling intercepting lib', () => intercepting_lib.foo_sync())

	console.log('--- this should not be called !! ---')
})
*/
SEC.xPromiseTryCatch('starting', ({SEC, logger}) => {
	logger.log(`starting...`)

	//throw new Error('Foo')
	const good_lib = require('./good_lib').create({SEC})

	//return SEC.xPromiseResolve('calling bad lib', bad_lib.foo_async())
	//return intercepting_lib.foo_async()
	return SEC.xPromiseTry('calling intercepting lib', () => intercepting_lib.foo_async())
	//return good_lib.foo_async().then(() => console.log('--- this should not be called !! ---'))
})
