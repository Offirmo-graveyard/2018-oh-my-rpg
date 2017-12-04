"use strict";

const Conf = require('conf')

const soft_execution_context = require('@offirmo/soft-execution-context/src/soft-execution-context-node')
const { compatibleLoggerToConsole } = require('@offirmo/loggers-types-and-stubs')
const { migrate_to_latest } = require('@oh-my-rpg/state-the-boring-rpg')
const { displayError } = require('@offirmo/soft-execution-context/src/display-ansi')

const { prettify_json_for_debug } = require('./utils/debug')

/////////////////////////////////////////////////


const SEC = soft_execution_context.node.create({
	module: 'the-npm-rpg',
	onError: displayError,
	context: {
		ENV: 'development', // TODO auto
		logger: compatibleLoggerToConsole,
	}
})

SEC.listenToUncaughtErrors()
SEC.listenToUnhandledRejections()
SEC.xTry('init', ({logger}) => {
	logger.info('Soft Execution Context initialized.')
})


function get_SEC() {
	return SEC
}

function init_savegame({verbose}) {
	return SEC.xTry('init_savegame', ({logger}) => {
		const config = new Conf({
			configName: 'state',
			defaults: {},
		})

		// TODO verbose in SEC
		logger.debug('config path:', config.path)
		logger.debug('loaded state:', prettify_json_for_debug(config.store))

		const state = migrate_to_latest(SEC, config.store)
		logger.debug('migrated state:', prettify_json_for_debug(state))

		config.clear()
		config.set(state)

		return config
	})
}

/////////////////////////////////////////////////

module.exports = {
	init_savegame,
}
