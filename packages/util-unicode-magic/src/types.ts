import { Enum } from 'typescript-string-enums'

/////////////////////

interface CharMapping {
	id: string
	inherits?: string
	alphabet_upper?: number[]
	alphabet_lower?: number[]
	numbers?: number[]
	others: Map<number, string>
}



const Font = Enum(
	'EnclosedLight'
)
type Font = Enum<typeof Font>

/////////////////////

export {
	CharMapping,
	Font,
}

/////////////////////
