/////////////////////

import * as uuidv4 from 'uuid/v4'
import * as deepFreeze from 'deep-freeze-strict'

import { LIB_ID, SCHEMA_VERSION } from './consts'

import {
	State,
} from './types'

/////////////////////

const DEFAULT_NAME = 'anonymous'

///////

function factory(): State {
	return {
		schema_version: SCHEMA_VERSION,
		revision: 0,

		uuid: uuidv4(), // ok this breaks functional programming, nevermind
		name: DEFAULT_NAME,
		email: null,
		allow_telemetry: true,
	}
}

/////////////////////

function rename(state: State, new_name: string): State {
	if (!new_name)
		throw new Error(`Error while renaming to "${new_name}: invalid value!`)

	state.name = new_name

	return state
}

function set_email(state: State, email: string): State {
	if (!email)
		throw new Error(`Error while setting mail to "${email}: invalid value!`)

	state.email = email

	return state
}

/////////////////////

// needed to test migrations, both here and in composing parents

// a full featured, non-trivial demo state
// needed for demos
const DEMO_STATE: State = deepFreeze({
	schema_version: 1,
	revision: 5,

	uuid: 'd4759a75-81a2-4730-a0ef-79c7d0356ee8',
	name: 'Offirmo',
	email: 'offirmo.net@gmail.com',
	allow_telemetry: false,
})

// the oldest format we can migrate from
// must correspond to state above
const OLDEST_LEGACY_STATE_FOR_TESTS: any = deepFreeze({
	// no schema_version = 0

	uuid: 'd4759a75-81a2-4730-a0ef-79c7d0356ee8',
	name: 'Offirmo',
	email: 'offirmo.net@gmail.com',
	allow_telemetry: false,
})

// some hints may be needed to migrate to demo state
const MIGRATION_HINTS_FOR_TESTS: any = deepFreeze({
	to_v1: {
		revision: 5
	},
})

/////////////////////

export {
	State,

	DEFAULT_NAME,
	factory,
	rename,
	set_email,

	DEMO_STATE,
	OLDEST_LEGACY_STATE_FOR_TESTS,
	MIGRATION_HINTS_FOR_TESTS,
}

/////////////////////
