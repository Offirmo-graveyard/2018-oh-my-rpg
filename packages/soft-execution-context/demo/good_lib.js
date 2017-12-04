"use strict";

const soft_execution_context = require('../dist/src.es7.cjs')

const LIB = 'GOOD_LIB'


function create({SEC} = {}) {
	SEC = soft_execution_context.isomorphic.create({parent: SEC, module: LIB})

	const {xTry, xTryCatch, xPromiseTry} = SEC

	// TODO add an id!
	return xTryCatch('instantiating', ({debugId, logger, ENV}) => {
		logger.trace(`${debugId}: ENV = "${ENV}"`)

		function foo_sync({x} = {}) {
			xTry('foo_sync()', () => {
				if (!x) {
					throw new Error('Missing arg x!') // msg will be auto-prefixed :-)
				}
			})

			return 42
		}

		async function foo_async() {
			return xPromiseTry('foo_async()', () => {
				return new Promise((resolve, reject) => {
					setTimeout(() => reject(new Error('failed to do X in time!')), 100) // msg will be auto-prefixed :-)
				})
			})
		}

		return {
			foo_sync,
			foo_async,
		}
	})
}


module.exports = {
	create,
}
