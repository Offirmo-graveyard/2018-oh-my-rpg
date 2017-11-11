/////////////////////

import * as nanoid from 'nanoid'

import { UUID } from './types'

///////

const UUID_RADIX = 'uu1'

const NANOID_LENGTH_FOR_1BTH_COLLISION_CHANCES = 21 // according to the doc

const UUID_LENGTH = UUID_RADIX.length + NANOID_LENGTH_FOR_1BTH_COLLISION_CHANCES

function generate_uuid(length = NANOID_LENGTH_FOR_1BTH_COLLISION_CHANCES): UUID {
	return UUID_RADIX + nanoid(length)
}

/////////////////////

export {
	UUID_LENGTH,
	generate_uuid,
}

/////////////////////
