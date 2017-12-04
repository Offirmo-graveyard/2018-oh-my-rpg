"use strict";

import { compatibleLoggerToVoid } from '@offirmo/loggers-types-and-stubs'
import { LIB, INTERNAL_PROP } from '../../constants'
import { SUB_LIB } from './constants'


function installPluginDependencyInjection(SEC, args) {
	const {parent, context} = args
	// TODO check params
	// TODO report handled params

	// inherit some stuff from our parent
	if (parent) {
		SEC[INTERNAL_PROP].context = {
			// TODO check conflicts?
			...parent[INTERNAL_PROP].context,
			...SEC[INTERNAL_PROP].context,
		}
	}

	const toInject = {
		// TODO check conflicts?
		logger: SEC[INTERNAL_PROP].context.logger || compatibleLoggerToVoid,
		ENV: SEC[INTERNAL_PROP].context.ENV || 'production',
		...context,
		logicalStack: SEC[INTERNAL_PROP].logicalStack,
		debugId: SEC[INTERNAL_PROP].logicalStack.short,
	}

	SEC[INTERNAL_PROP].context = {
		...SEC[INTERNAL_PROP].context,
		...toInject,
	}

	//SEC.context.logger.log('test foo')

	return SEC
}

export {
	installPluginDependencyInjection,
}
