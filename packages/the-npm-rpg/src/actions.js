const tbrpg = require('@oh-my-rpg/state-the-boring-rpg')

function play({config}) {
	let state = config.store
	state = tbrpg.play(state)
	config.set(state)
}

module.exports = {
	play,
}
