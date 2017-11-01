/////////////////////

import { Enum } from 'typescript-string-enums'

/////////////////////

const TextStyle = Enum(
	'person',
	'item',
	'place',
)
type TextStyle = Enum<typeof TextStyle>

/////////////////////

export {
	TextStyle,
}

/////////////////////
