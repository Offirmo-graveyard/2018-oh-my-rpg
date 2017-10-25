/////////////////////

import { LIB_ID, SCHEMA_VERSION } from './consts'
import { State } from './types'
import { factory } from './state'

/////////////////////

function migrate_to_latest(legacy_state: any, hints: any = {}): State {
	const src_version = legacy_state.schema_version || 0

	let state: State = factory()

	if (src_version === SCHEMA_VERSION)
		state = legacy_state as State
	else if (src_version > SCHEMA_VERSION)
		throw new Error(`${LIB_ID}: Your data is from a more recent version of this lib. Please update!`)
	else {
		// TODO logger
		console.warn(`${LIB_ID}: attempting to migrate schema from v${src_version} to v${SCHEMA_VERSION}:`)
		state = migrate_to_1(legacy_state, hints)
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

function fail_migration_by_resetting(): State {
	// TODO send event upwards
	console.error(`${LIB_ID}: failed migrating schema, performing full reset !`)
	return factory()
}

/////////////////////

export {
	migrate_to_latest,
}
