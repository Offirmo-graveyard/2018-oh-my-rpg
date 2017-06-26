////////////////////////////////////

interface NumberHash {
	[k: string]: number
}

////////////

const QUALITY_STRENGTH_BONUS_AT_GENERATION: NumberHash = {
	common:    0,
	uncommon:  1,
	rare:      3,
	epic:      4,
	legendary: 5,
	artifact:  6
}

// actualized strength
// quality multipliers (see spreadsheet for calculation)
const QUALITY_STRENGTH_MULTIPLIER: NumberHash = {
	common:      1,
	uncommon:   19,
	rare:       46,
	epic:       91,
	legendary: 182,
	artifact:  333
}

const QUALITY_STRENGTH_SPREAD: NumberHash = {
	common:    6,
	uncommon:  5,
	rare:      4,
	epic:      3,
	legendary: 2,
	artifact:  1
}

const ENHANCEMENT_MULTIPLIER = 0.2

////////////////////////////////////

export {
	NumberHash,
	QUALITY_STRENGTH_BONUS_AT_GENERATION,
	QUALITY_STRENGTH_MULTIPLIER,
	QUALITY_STRENGTH_SPREAD,
	ENHANCEMENT_MULTIPLIER,
}

////////////////////////////////////
