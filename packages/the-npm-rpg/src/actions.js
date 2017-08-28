const tbrpg = require('@oh-my-rpg/state-the-boring-rpg')

function play({config}) {
	let state = config.store
	state = tbrpg.play(state)
	config.set(state)
}

function equip_item({config}, coordinates) {
	let state = config.store
	state = tbrpg.equip_item(state, coordinates)
	config.set(state)
}

function rename_hero({config}, new_name) {
	let state = config.store
	state = tbrpg.equip_item(state, coordinates)
	config.set(state)
}


module.exports = {
	play,
	equip_item,
}
