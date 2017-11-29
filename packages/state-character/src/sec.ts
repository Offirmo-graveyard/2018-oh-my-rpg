// safe-execution-context declarations

import * as safe_execution_context from '@offirmo/safe-execution-context'

import { LIB_ID, SCHEMA_VERSION } from './consts'
import { State } from './types'

type SafeExecutionContext = any



interface BaseSECContext {
	SEC: SafeExecutionContext
	logger: any
}

interface SECContext extends BaseSECContext {
	enforce_immutability: (state: State) => State
}

function getSEC(SEC?: SafeExecutionContext): SafeExecutionContext {
	const enforce_immutability = (state: State) => state // TODO move up
	//const enforce_immutability = (state: State) => deepFreeze(state)

	return safe_execution_context.isomorphic.create({
		parent: SEC, // whether it exists or not
		module: LIB_ID,
		context: {
			enforce_immutability,
		},
		// TODO add debug details, version, etc.
	})
}


export {
	SafeExecutionContext,
	BaseSECContext,
	SECContext,
	getSEC,
}
