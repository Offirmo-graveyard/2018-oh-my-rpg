import React from 'react'


import * as RichText from '@oh-my-rpg/rich-text-format'

import {
	render_item,
	render_character_sheet,
	render_full_inventory,
	render_adventure,
	render_account_info,
} from '@oh-my-rpg/view-rich-text'


function Home({workspace}) {
	const { state } = workspace

	const markup = {
		__html: RichText.to_html(render_full_inventory(state.inventory, state.wallet))
			+ RichText.to_html(render_character_sheet(state.avatar))
			+ RichText.to_html(render_account_info(state.meta))
	}

	return (
		<div>
			Home
			<div dangerouslySetInnerHTML={markup} />
		</div>
	)
}

export {
	Home,
}
