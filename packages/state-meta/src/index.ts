/////////////////////

//import * as uuidv4 from 'uuid/v4'

import {
	State,
} from './types'

/////////////////////

const DEFAULT_NAME = 'anonymous'

///////

function factory(): State {
	return {
		//uuid: uuidv4() as string,
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

export {
	State,

	DEFAULT_NAME,
	factory,
	rename,
	set_email,
}

/////////////////////
