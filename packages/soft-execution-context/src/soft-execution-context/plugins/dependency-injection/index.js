"use strict";

import { compatibleLoggerToVoid } from '@offirmo/loggers-types-and-stubs'
import { LIB, INTERNAL_PROP } from '../../constants'
import { SUB_LIB } from './constants'
import { createLogger, createChildLogger } from '../../../universal-logger-core'

function installPluginDependencyInjection(SEC, args) {
	const { parent } = args
	let { context = {}, contextGenerators = {} } = args

	// TODO check params
	// TODO report handled params

	// inherit some stuff from our parent, but at lower priority
	if (parent) {
		// TODO check conflicts?

		// inherit intelligently those one:
		const logLevel = context.logLevel || (parent[INTERNAL_PROP].LS.logicalStack.short === SEC[INTERNAL_PROP].LS.logicalStack.short
			? parent[INTERNAL_PROP].DI.context.logLevel
			: 'error')
		const logger = context.logger || parent[INTERNAL_PROP].DI.context.logger.child({
			name: SEC[INTERNAL_PROP].LS.logicalStack.short,
			logLevel,
			details: {
				// TODO
			}
		})

		context = {
			...parent[INTERNAL_PROP].DI.context,
			...context,
			logLevel,
			logger,
		}
		contextGenerators = {
			...parent[INTERNAL_PROP].contextGenerators,
			...contextGenerators,
		}
	}
	else {
		// provide defaults to overridable props
		context = {
			env: 'development', // like express does
			logger: createLogger({
				name: SEC[INTERNAL_PROP].LS.logicalStack.short,
				level: context.logLevel,
			}), // TODO child ?
			logLevel: context.logger
				? context.logger.getLevel()
				: 'error',
			...context,
		}
	}

	// inject non-overridable ones
	context = {
		// TODO check conflicts?
		...context,
		logicalStack: SEC[INTERNAL_PROP].LS.logicalStack,
		tracePrefix: SEC[INTERNAL_PROP].LS.logicalStack.short,
	}

	// build generated values
	Object.keys(contextGenerators).forEach(key => {
		context[key] = contextGenerators[key](context)
	})

	// TODO check non-overridable ?
	// TODO deep freeze ?

	SEC[INTERNAL_PROP].DI = {
		context,
		contextGenerators,
	}

	//SEC.context.logger.log('test foo')

	return SEC
}

export {
	installPluginDependencyInjection,
}
