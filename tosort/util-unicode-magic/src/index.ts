/////////////////////
import * as punycode from 'punycode'

import {
	CharMapping,
	Font,
} from './types'

import {
	CHAR_MAPPINGS,
	CHAR_MAPPINGS_BY_ID,
} from './constants'

/////////////////////

/*
const MAPPING_FNS = CHAR_MAPPINGS.map(char_mapping => {

})*/

function mapUnicodeChar(str: string, callback: (codepoint: number) => string): string {
	return punycode.ucs2.decode(str)
		.map(callback)
		.join('')
}

const CODEPOINTS = {
	a: 'a'.codePointAt(0)!,
	z: 'z'.codePointAt(0)!,
	A: 'A'.codePointAt(0)!,
	Z: 'Z'.codePointAt(0)!,
	zero: '0'.codePointAt(0)!,
	nine: '9'.codePointAt(0)!,
}

function map_single_char(m: CharMapping, codepoint: number): string {
	let c: string
	if (!m.others.has(codepoint)) {
		if (m.numbers && codepoint >= CODEPOINTS.zero && codepoint <= CODEPOINTS.nine)
			c = punycode.ucs2.encode([m.numbers[codepoint - CODEPOINTS.zero]])
		else if (m.alphabet_upper && codepoint >= CODEPOINTS.A && codepoint <= CODEPOINTS.Z)
			c = punycode.ucs2.encode([m.alphabet_upper[codepoint - CODEPOINTS.A]])
		else if (m.alphabet_lower && codepoint >= CODEPOINTS.a && codepoint <= CODEPOINTS.z)
			c = punycode.ucs2.encode([m.alphabet_lower[codepoint - CODEPOINTS.a]])
		else if (m.inherits)
			c = map_single_char(CHAR_MAPPINGS_BY_ID[m.inherits], codepoint)
		else
			c = punycode.ucs2.encode([codepoint])

		// cache it
		m.others.set(codepoint, c)
	}

	return m.others.get(codepoint)!
}

function map_string(m: CharMapping, str: string): string {
	return mapUnicodeChar(str, cp => map_single_char(m, cp))
}

function apply_font(id: string, str: string): string {
	const m = CHAR_MAPPINGS_BY_ID[id]
	if (!m)
		throw new Error(`Unknown font "${id}"!`)

	return map_string(m, str)
}


/////////////////////

interface Options {

}

function factory(options: Options): void {

}


/////////////////////

export {
	CHAR_MAPPINGS,
	CHAR_MAPPINGS_BY_ID,
	CharMapping,
	map_string,
	apply_font,
	Options,
	factory,
}

/////////////////////
