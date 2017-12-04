import {ERROR_FIELDS} from '../fields'

function displayErrProp(errLike, prop) {
	console.error(`🔥  ${prop}: "${errLike[prop]}"`)
}

function displayError(errLike = {}) {
	console.error(`🔥🔥🔥🔥🔥🔥🔥  ${errLike.name || 'Error'} 🔥🔥🔥🔥🔥🔥🔥`)

	const displayedProps = new Set()
	displayedProps.add('name')

	if (errLike.message) {
		displayErrProp(errLike, 'message')
		displayedProps.add('message')
	}
	if (errLike.logicalStack) {
		displayErrProp(errLike, 'logicalStack')
		displayedProps.add('logicalStack')
	}

	ERROR_FIELDS.forEach(prop => {
		if (prop in errLike && !displayedProps.has(prop))
			displayErrProp(errLike, prop)
	})
}


export {
	displayError,
}
