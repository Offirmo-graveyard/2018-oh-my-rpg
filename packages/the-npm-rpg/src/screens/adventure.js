const { wrapLines, stylizeString } = require('../deps')

const { render_adventure } = require('@oh-my-rpg/view-text')

/////////////////////////////////////////////////



function render({term_width, config, rendering_options}) {
	const state = config.store

	console.log(''
		//'You continue your adventures...\n\n'
		+ `Episode #${state.good_click_count}\n`
		+ wrapLines(term_width)(
			stylizeString.bold(render_adventure(state.last_adventure, rendering_options))
		)
	)
}

/////////////////////////////////////////////////

module.exports = {
	render,
}
