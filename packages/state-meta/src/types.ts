import { Enum } from 'typescript-string-enums'

/////////////////////

interface State {
	uuid: string
	name: string
	email: string | null
	allow_telemetry: boolean
}

/////////////////////

export {
	State,
}

/////////////////////
