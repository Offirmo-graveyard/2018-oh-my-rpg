/////////////////////

import * as MetaState from '@oh-my-rpg/state-meta'
import * as CharacterState from '@oh-my-rpg/state-character'
import * as WalletState from '@oh-my-rpg/state-wallet'
import * as InventoryState from '@oh-my-rpg/state-inventory'
import * as PRNGState from '@oh-my-rpg/state-prng'


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
		// TODO logger
		console.warn(`${LIB_ID}: attempting to migrate schema from v${src_version} to v${SCHEMA_VERSION}:`)
		state = migrate_to_3(legacy_state, hints)
	}

	// migrate sub-reducers if any...
	state.meta = MetaState.migrate_to_latest(state.meta, hints.meta)
	state.avatar = CharacterState.migrate_to_latest(state.avatar, hints.avatar)
	state.inventory = InventoryState.migrate_to_latest(state.inventory, hints.inventory)
	state.wallet = WalletState.migrate_to_latest(state.wallet, hints.wallet)
	state.prng = PRNGState.migrate_to_latest(state.prng, hints.prng)

	return state
}

/////////////////////

function migrate_to_3(legacy_state: any, hints: any): State {
	if (legacy_state.schema_version !== 2)
		legacy_state = migrate_to_2(legacy_state, hints)

	console.info(`${LIB_ID}: migrating schema from v${legacy_state.schema_version} to v${legacy_state.schema_version+1}…`)
	const { last_adventure } = legacy_state
	if (last_adventure) {
		last_adventure.gains.coin = last_adventure.gains.coins
		last_adventure.gains.token = last_adventure.gains.tokens
		delete last_adventure.gains.coins
		delete last_adventure.gains.tokens
		last_adventure.uuid =
	}
	return {
		...legacy_state,
		last_adventure,
		schema_version: 3,
	}
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
	return create()
}

/////////////////////

export {
	migrate_to_1,
	migrate_to_latest,
}
