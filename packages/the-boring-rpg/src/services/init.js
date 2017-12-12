"use strict";

import * as soft_execution_context from '@offirmo/soft-execution-context/dist/src.es7.cjs/soft-execution-context-browser'
import { migrate_to_latest } from '@oh-my-rpg/state-the-boring-rpg'
const { createLogger } = require('@offirmo/soft-execution-context/dist/src.es7.cjs/universal-logger-browser')

import { LS_KEYS } from './consts'

/////////////////////////////////////////////////

const logger = createLogger({
	name: 'the-boring-rpg',
	level: 'trace',
})
logger.trace('Logger up.')


function onError(err) {
	logger.fatal('error!', {err})
}

// TODO report sentry
const SEC = soft_execution_context.browser.create({
	module: 'the-boring-rpg',
	onError,
	context: {
		logger,
	}
})
soft_execution_context.setRoot(SEC)

//SEC.listenToUncaughtErrors()
//SEC.listenToUnhandledRejections()
logger.trace('Soft Execution Context initialized.')

function get_SEC() {
	return SEC
}

/////////////////////////////////////////////////

function init_savegame({verbose}) {
	const lscontent = localStorage.getItem(LS_KEYS.savegame)
	let state = null
	try {
		if (lscontent)
			state = JSON.parse(lscontent)
	}
	catch (err) {}

	if (verbose) console.log('LS key:', LS_KEYS.savegame)
	if (verbose) console.log('loaded state:', state)

	state = migrate_to_latest(SEC, state)
	if (verbose) console.log('migrated state:', state)

	localStorage.setItem(LS_KEYS.savegame, JSON.stringify(state))

	return state
}

/////////////////////////////////////////////////

export {
	SEC,
	init_savegame,
}
