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
		state = migrate_to_2(legacy_state, hints)
	}

	// migrate sub-reducers if any...

	return state
}

/////////////////////

function migrate_to_2(legacy_state: any, hints: any): State {
	if (legacy_state.schema_version !== 1)
		legacy_state = migrate_to_1(legacy_state, hints)

	console.info(`${LIB_ID}: migrating schema from v1 to v2...`)
	return {
		...legacy_state,
		schema_version: 2,
		revision: (hints && hints.to_v2 && hints.to_v2.revision) || 0, // added
	}
}

/////////////////////

function migrate_to_1(legacy_state: any, hints: any): any {
	if (legacy_state.hasOwnProperty('characteristics')) {
		console.info(`${LIB_ID}: migrating schema from v0/non-versioned to v1...`)
		const { name, klass, characteristics } = legacy_state
			return {
				name,
				klass,
				attributes: characteristics, //< renamed
				schema_version: 1, // added
			}
	}

	return fail_migration_by_resetting()
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
