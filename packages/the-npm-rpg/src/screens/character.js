const { stylizeString } = require('../deps')

const {
	render_characteristics
} = require('@oh-my-rpg/view-text')

/////////////////////////////////////////////////



function render({config, rendering_options}) {
	const state = config.store

	console.log(''
		//stylizeString.bold('🙂  CHARACTERISTICS 💗\n')
		+ stylizeString.bold('CHARACTERISTICS:\n')
		+ render_characteristics(state.avatar, rendering_options)
	)
}

/////////////////////////////////////////////////

module.exports = {
	render,
}
