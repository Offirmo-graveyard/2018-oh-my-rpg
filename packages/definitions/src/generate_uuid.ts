/////////////////////

import * as nanoid from 'nanoid'

///////

function generate_uuid(length = 21): string {
	return 'uu1' + nanoid(length)
}

/////////////////////

export {
	generate_uuid,
}

/////////////////////
