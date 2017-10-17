import {
	LIB_ID,
	SCHEMA_VERSION,
} from './consts'
import { State } from './types'
import { factory } from './index'


function migrate_to_latest(state: any): State {
	const src_version = state.version

	if (!state.version) {
		// no previous data
		return factory()
	}

	if (src_version === SCHEMA_VERSION)
		return state as State

	if (src_version > SCHEMA_VERSION)
		throw new Error(`${LIB_ID}: You saved game was is from a more recent version of this game. Please update!`)

	// TODO logger
	console.warn(`${LIB_ID}: attempting to migrate schema from v${src_version} to v${SCHEMA_VERSION}...`)

	return migrate_to_1(state)
}

function migrate_to_1(legacy_state: any): State {
	// TODO improve for cascade

	if (legacy_state.hasOwnProperty('characteristics')) {
		console.info(`${LIB_ID}: migrating schema from (non versioned) to v1...`)
		const { name, klass, characteristics } = legacy_state
			return {
				name,
				klass,
				attributes: characteristics,
				schema_version: 1,
			}
	}

	return fail_migration_by_resetting()
}

function fail_migration_by_resetting(): State {
	// TODO send event upwards
	console.error(`${LIB_ID}: failed migrating, performing full reset !`)
	return factory()
}

export {
	migrate_to_latest,
}
