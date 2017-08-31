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

function rename_avatar({config}, new_name) {
	let state = config.store
	state = tbrpg.rename_avatar(state, new_name)
	config.set(state)
}

function change_class({config}, new_class) {
	let state = config.store
	state = tbrpg.change_avatar_class(state, new_class)
	config.set(state)
}

module.exports = {
	play,
	equip_item,
	rename_avatar,
	change_class,
}
