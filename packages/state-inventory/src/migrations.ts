/////////////////////

import { LIB_ID, SCHEMA_VERSION } from './consts'
import { State } from './types'
import { create } from './state'

/////////////////////

function migrate_to_latest(legacy_state: any, hints: any = {}): State {
	const src_version = legacy_state.schema_version || 0

	let state: State = create()

	if (src_version === SCHEMA_VERSION)
		state = legacy_state as State
	else if (src_version > SCHEMA_VERSION)
		throw new Error(`${LIB_ID}: Your data is from a more recent version of this lib. Please update!`)
	else {
		try {
			// TODO logger
			console.warn(`${LIB_ID}: attempting to migrate schema from v${src_version} to v${SCHEMA_VERSION}:`)
			state = migrate_to_1(legacy_state, hints)
			console.info(`${LIB_ID}: schema migration successful.`)
		}
		catch (e) {
			// failed, reset all
			// TODO send event upwards
			console.error(`${LIB_ID}: failed migrating schema, performing full reset !`)
			state = create()
		}
	}

	// migrate sub-reducers if any...
	// TODO migrate items

	return state
}

/////////////////////

function migrate_to_1(legacy_state: any, hints: any): any {
	console.info(`${LIB_ID}: migrating schema from v0/non-versioned to v1...`)
	return {
		...legacy_state,
		schema_version: 1, // added
		revision: (hints && hints.to_v1 && hints.to_v1.revision) || 0, // added
	}
}

/////////////////////

export {
	migrate_to_latest,
}
