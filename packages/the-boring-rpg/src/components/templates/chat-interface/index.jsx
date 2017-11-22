import React from 'react'
import classNames from 'classnames'

function Chat({children}) {
	const classes = classNames('chat')
	return (
		<div className={classes}>
			{children}
		</div>
	)
}

function ChatBubble({direction = 'ltr', children}) {
	const classes = classNames(
		'chat__bubble',
		{ 'chat__bubble--ltr': direction === 'ltr'},
		{ 'chat__bubble--rtl': direction === 'rtl'},
	)
	return (
		<div className={classes}>
			{children}
		</div>
	)
}

export {
	Chat,
	ChatBubble,
}

