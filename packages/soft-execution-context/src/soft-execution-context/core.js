
import NanoEvents from 'nanoevents'

import { LIB, INTERNAL_PROP } from './constants'

import {promiseTry} from '../promise-try'
import {normalizeError} from '../normalize'
import {createCatcher} from '../catch-factory'
import {installPluginLogicalStack} from './plugins/logical-stack'
import {installPluginDependencyInjection} from './plugins/dependency-injection'

function isSEC(SEC) {
	return (SEC && SEC[INTERNAL_PROP])
}

function create(args = {}) {
	if (args.parent && !isSEC(args.parent))
		throw new Error(`${LIB}›create() argument error: parent must be a valid SEC!`)

	const onError = args.onError || (args.parent && args.parent.onError) // XXX really?

	let SEC = {
		[INTERNAL_PROP]: {
			errDecorators: [ normalizeError ],
			state: {}, // TODO
			context: {},
		},

		child,
		xTry,
		xTryCatch,
		xPromiseTry,
		xPromiseCatch,
		xPromiseTryCatch,
	}

	// TODO rationalize
	//if (SEC.verbose) console.log(`${LIB}: new SEC:`, args)

	SEC = installPluginLogicalStack(SEC, args)
	SEC = installPluginDependencyInjection(SEC, args)

	/////////////////////

	function child(args) {
		// optim for libs which securely enforce a child of provided SEC
		if (isSEC(args) && args[INTERNAL_PROP].module && args[INTERNAL_PROP].module === SEC[INTERNAL_PROP].module) {
			// no need to create a child of oneself
			return SEC
		}

		return create({
			...args,
			parent: SEC,
		})
	}

	/////////////////////

	function xTry(operation, fn) {
		const sub_SEC = SEC.child({operation})
		const params = {...sub_SEC[INTERNAL_PROP].context, SEC: sub_SEC}
		try {
			return fn(params)
		}
		catch (err) {
			createCatcher({
				decorators: sub_SEC[INTERNAL_PROP].errDecorators,
				onError: null,
				debugId: 'xTry',
			})(err)
		}
	}

	function xTryCatch(operation, fn) {
		const sub_SEC = SEC.child({operation})
		const params = {...sub_SEC[INTERNAL_PROP].context, SEC: sub_SEC}
		try {
			return fn(params)
		}
		catch (err) {
			createCatcher({
				decorators: sub_SEC[INTERNAL_PROP].errDecorators,
				onError,
				debugId: 'xTryCatch',
			})(err)
		}
	}

	function xPromiseCatch(operation, promise) {
		const sub_SEC = SEC.child({operation})
		return promise
			.catch(createCatcher({
				decorators: sub_SEC[INTERNAL_PROP].errDecorators,
				onError,
				debugId: 'xTryCatch',
			}))
	}

	function xPromiseTry(operation, fn) {
		const sub_SEC = SEC.child({operation})
		const params = {...sub_SEC[INTERNAL_PROP].context, SEC: sub_SEC}
		return promiseTry(() => fn(params))
			.catch(createCatcher({
				decorators: sub_SEC[INTERNAL_PROP].errDecorators,
				onError: null,
				debugId: 'xPromiseTry',
			}))
	}

	function xPromiseTryCatch(operation, fn) {
		const sub_SEC = SEC.child({operation})
		const params = {...sub_SEC[INTERNAL_PROP].context, SEC: sub_SEC}
		return promiseTry(() => fn(params))
			.catch(createCatcher({
				decorators: sub_SEC[INTERNAL_PROP].errDecorators,
				onError,
				debugId: 'xPromiseTryCatch',
			}))
	}

	return SEC
}

export {
	create,
}
