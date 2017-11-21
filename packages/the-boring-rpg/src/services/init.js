"use strict";

import { migrate_to_latest } from '@oh-my-rpg/state-the-boring-rpg'

import { LS_KEYS } from './consts'

/////////////////////////////////////////////////

function init_savegame({verbose}) {
	const lscontent = localStorage.getItem(LS_KEYS.savegame)
	let state = null
	try {
		if (lscontent)
			state = JSON.parse(lscontent)
	}
	catch (err) {}

	if (verbose) console.log('LS key:', LS_KEYS.savegame)
	if (verbose) console.log('loaded state:', state)

	state = migrate_to_latest(state)
	if (verbose) console.log('migrated state:', state)

	localStorage.setItem(LS_KEYS.savegame, JSON.stringify(state))

	return state
}

/////////////////////////////////////////////////

export {
	init_savegame,
}
