import React from 'react'

const tbrpg = require('@oh-my-rpg/state-the-boring-rpg')
import { render_adventure } from '@oh-my-rpg/view-rich-text'

import { play } from '../../../services/actions'
import { rich_text_to_react } from '../../../utils/rich_text_to_react'


class Home extends React.Component {

	componentDidMount () {
		console.info('~~ componentDidMount', arguments)
		this.element.addEventListener('click', event => {
			console.log('click detected on', event.target)
			const {workspace} = this.props
			play(workspace)
			this.forceUpdate()
		})
	}

	componentWillUnmount () {
		console.info('~~ componentWillUnmount', arguments)
	}

	render() {
		const {workspace} = this.props
		const {state} = workspace

		const doc_recap = tbrpg.get_recap(state)
		const doc_tip = tbrpg.get_tip(state)
		const doc_adventure = state.last_adventure && render_adventure(state.last_adventure)

		return (
			<div ref={elt => this.element = elt}>
				{doc_recap && <div key={'recap'}>{rich_text_to_react(doc_recap)}</div>}
				{doc_tip && <div key={'tip'}>{rich_text_to_react(doc_tip)}</div>}
				{doc_adventure && <div key={'la'}>{rich_text_to_react(doc_adventure)}</div>}
				<button>play</button>
			</div>
		)
	}
}

export {
	Home,
}
