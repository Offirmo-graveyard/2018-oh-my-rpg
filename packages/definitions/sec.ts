// safe-execution-context declarations

import * as soft_execution_context from '@offirmo/soft-execution-context'

import { LIB_ID, SCHEMA_VERSION } from './consts'
import { State } from './types'

type SoftExecutionContext = any



interface BaseSECContext {
	SEC: SoftExecutionContext
	logger: any
}

interface SECContext extends BaseSECContext {
	enforce_immutability: (state: State) => State
}

function get_SEC(SEC?: SoftExecutionContext): SoftExecutionContext {
	const enforce_immutability = (state: State) => state
	//const enforce_immutability = (state: State) => deepFreeze(state)

	return soft_execution_context.isomorphic.create({
		parent: SEC, // whether it exists or not
		module: "oh-my-rpg",
		context: {
			enforce_immutability,
		},
		// TODO add debug details, version, etc.
	})
}


export {
	SoftExecutionContext,
	BaseSECContext,
	SECContext,
	get_SEC,
}
