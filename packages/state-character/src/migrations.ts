import { LIB_ID, SCHEMA_VERSION } from './consts'
import { State } from './types'
import { factory } from './state'


function migrate_to_latest(legacy_state: any): State {
	const src_version = legacy_state.schema_version || 0

	let state: State = factory()

	if (src_version === SCHEMA_VERSION)
		state = legacy_state as State
	else if (src_version > SCHEMA_VERSION)
		throw new Error(`${LIB_ID}: Your data is from a more recent version of this lib. Please update!`)
	else {
		// TODO logger
		console.warn(`${LIB_ID}: attempting to migrate schema from v${src_version} to v${SCHEMA_VERSION}...`)
		state = migrate_to_1(legacy_state)
	}

	// migrate sub-reducers if any...

	return state
}

function migrate_to_1(legacy_state: any): State {
	// TODO improve for cascade

	if (legacy_state.hasOwnProperty('characteristics')) {
		console.info(`${LIB_ID}: migrating schema from (non versioned) to v1...`)
		const { name, klass, characteristics } = legacy_state
			return {
				name,
				klass,
				attributes: characteristics, //< renamed
				schema_version: 1,
			}
	}

	return fail_migration_by_resetting()
}

function fail_migration_by_resetting(): State {
	// TODO send event upwards
	console.error(`${LIB_ID}: failed migrating schema, performing full reset !`)
	return factory()
}

export {
	migrate_to_latest,
}
