"use strict";

import { LIB, INTERNAL_PROP } from '../../constants'
import {
	SUB_LIB,
	LOGICAL_STACK_BEGIN_MARKER,
	LOGICAL_STACK_END_MARKER,
	LOGICAL_STACK_MODULE_MARKER,
	LOGICAL_STACK_SEPARATOR,
	LOGICAL_STACK_OPERATION_MARKER,
	LOGICAL_STACK_SEPARATOR_NON_ADJACENT,
} from './constants'

import { ERROR_FIELDS } from '../../../fields'

function getLogicalStack(module, operation, parentModule, parentFullLStack = LOGICAL_STACK_BEGIN_MARKER) {
	if (!module && !parentModule)
		throw new Error(`${LIB}: you must provide 'module' to annotate errors with a logical stack!`)
	module = module || parentModule

	if (!module && !operation)
		throw new Error(`${LIB}: you must provide 'module' and/or 'operation' to annotate errors with a logical stack!`)

	let shortLStack = ''
		+ LOGICAL_STACK_BEGIN_MARKER
		+ LOGICAL_STACK_MODULE_MARKER
		+ module

	let fullLStack = parentFullLStack

	if (module !== parentModule)
		fullLStack += ''
			+ (parentFullLStack === LOGICAL_STACK_BEGIN_MARKER ? '' : LOGICAL_STACK_SEPARATOR)
			+ LOGICAL_STACK_MODULE_MARKER
			+ module

	if (operation) {
		fullLStack += ''
			+ LOGICAL_STACK_SEPARATOR
			+ operation
			+ LOGICAL_STACK_OPERATION_MARKER

		shortLStack += ''
			+ LOGICAL_STACK_SEPARATOR
			+ operation
			+ LOGICAL_STACK_OPERATION_MARKER
	}

	return {
		short: shortLStack,
		full: fullLStack,
	}
}


function installPluginLogicalStack(SEC, {module, operation, parent}) {
	// TODO check params

	// inherit some stuff from our parent
	if (parent) {
		module = module || parent[INTERNAL_PROP].module
	}

	if (parent && !parent[INTERNAL_PROP].logicalStack) {
		console.log('UHHH?')
	}


	const logicalStack = getLogicalStack(
		module,
		operation,
		parent ? parent[INTERNAL_PROP].module : undefined,
		parent ? parent[INTERNAL_PROP].logicalStack.full : undefined,
	)

	SEC[INTERNAL_PROP].errDecorators.push(function attachLogicalStack(err) {
		if (err.logicalStack) {
			// OK this error is already decorated.
			// message already decorated, don't touch

			// can we add more info?
			if (err.logicalStack.includes(logicalStack.full)) {
				// ok, already chained
			}
			else {
				// TOTEST
				err.logicalStack = logicalStack.full + LOGICAL_STACK_SEPARATOR_NON_ADJACENT + err.logicalStack
			}
		}
		else {
			if (!err.message.startsWith(logicalStack.short))
					 err.message = logicalStack.short + LOGICAL_STACK_END_MARKER + ' ' + err.message
			err.logicalStack = logicalStack.full
		}

		return err
	})

	ERROR_FIELDS.add('logicalStack')

	SEC[INTERNAL_PROP].module = module
	SEC[INTERNAL_PROP].operation = operation
	SEC[INTERNAL_PROP].logicalStack = logicalStack

	return SEC
}

export {
	installPluginLogicalStack,
}
