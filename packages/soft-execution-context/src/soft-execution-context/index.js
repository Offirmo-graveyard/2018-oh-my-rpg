
import {create as create_core} from './core'

function create(...args) {
	const SEC = create_core(...args)

	// TODO offer to hook setTimeout etc.
	//core.

	return SEC
}


export {
	create,
}
