/////////////////////
import { Enum } from 'typescript-string-enums'

///////

import { Adventure } from '@oh-my-rpg/state-the-boring-rpg'

/////////////////////

const TextStyle = Enum(
	'important_part',
	'elite_mark',
	'item_quality_common',
	'item_quality_uncommon',
	'item_quality_rare',
	'item_quality_epic',
	'item_quality_legendary',
	'item_quality_artifact',
	'change_outline',
)
type TextStyle = Enum<typeof TextStyle>


interface RenderingOptions {
	globalize: {
		formatMessage: Function
		formatNumber: Function
	}
	stylize: (style: TextStyle, s: string) => string
	last_adventure?: Adventure
}

/////////////////////

export {
	TextStyle,
	RenderingOptions,
}

/////////////////////
