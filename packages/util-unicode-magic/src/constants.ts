////////////////////////////////////
import * as punycode from 'punycode'

import {
	CharMapping,
	Font,
} from './types'

////////////////////////////////////

const ENCLOSED_LIGHT: CharMapping = {
	id: 'EnclosedLight',
	alphabet_upper: punycode.ucs2.decode('ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ'),
	alphabet_lower: punycode.ucs2.decode('ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'),
	numbers: punycode.ucs2.decode('⓪①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳'),
	others: new Map<number, string>()
}
ENCLOSED_LIGHT.others.set('0'.codePointAt(0)!, '⓪')

// Greek and Coptic http://jrgraphix.net/r/Unicode/0370-03FF

// 13A0-13FF
const CHEROKEE: CharMapping = {
	id: 'Cherokee',
	alphabet_upper: undefined,
	alphabet_lower: undefined,
	numbers: undefined,
	others: new Map<number, string>()
}
CHEROKEE.others.set('4'.codePointAt(0)!, 'Ꮞ')
CHEROKEE.others.set('6'.codePointAt(0)!, 'Ꮾ')
CHEROKEE.others.set('9'.codePointAt(0)!, 'Ꮽ')
CHEROKEE.others.set('A'.codePointAt(0)!, 'Ꭺ')
CHEROKEE.others.set('b'.codePointAt(0)!, 'Ꮟ')
CHEROKEE.others.set('B'.codePointAt(0)!, 'Ᏼ')
CHEROKEE.others.set('C'.codePointAt(0)!, 'Ꮯ')
CHEROKEE.others.set('D'.codePointAt(0)!, 'Ꭰ')
CHEROKEE.others.set('E'.codePointAt(0)!, 'Ꭼ')
CHEROKEE.others.set('G'.codePointAt(0)!, 'Ꮐ')
CHEROKEE.others.set('H'.codePointAt(0)!, 'Ꮋ')
CHEROKEE.others.set('h'.codePointAt(0)!, 'Ꮒ')
CHEROKEE.others.set('J'.codePointAt(0)!, 'Ꭻ')
CHEROKEE.others.set('K'.codePointAt(0)!, 'Ꮶ')
CHEROKEE.others.set('L'.codePointAt(0)!, 'Ꮮ')
CHEROKEE.others.set('M'.codePointAt(0)!, 'Ꮇ')
CHEROKEE.others.set('O'.codePointAt(0)!, 'Ꮎ')
CHEROKEE.others.set('P'.codePointAt(0)!, 'Ꮲ')
CHEROKEE.others.set('R'.codePointAt(0)!, 'Ꭱ')
CHEROKEE.others.set('S'.codePointAt(0)!, 'Ꮪ')
CHEROKEE.others.set('T'.codePointAt(0)!, 'Ꭲ')
CHEROKEE.others.set('V'.codePointAt(0)!, 'Ꮩ')
CHEROKEE.others.set('W'.codePointAt(0)!, 'Ꮃ')
CHEROKEE.others.set('y'.codePointAt(0)!, 'Ꭹ')
CHEROKEE.others.set('Z'.codePointAt(0)!, 'Ꮓ')

const MATH_01: CharMapping = {
	id: 'Math01',
	alphabet_upper: punycode.ucs2.decode('𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙'),
	alphabet_lower: punycode.ucs2.decode('𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳'),
	others: new Map<number, string>()
}

// +++ Math http://jrgraphix.net/r/Unicode/1D400-1D7FF


// "form" http://jrgraphix.net/r/Unicode/FF00-FFEF
// old italic http://jrgraphix.net/r/Unicode/10300-1032F

// canadian aborigenals http://jrgraphix.net/r/Unicode/1400-167F
// phonetic extensions http://jrgraphix.net/r/Unicode/1D00-1D7F
// subscripts http://jrgraphix.net/r/Unicode/2070-209F
// letter-like http://jrgraphix.net/r/Unicode/2100-214F
// stargate? http://jrgraphix.net/r/Unicode/27C0-27EF

// TODO combining? http://jrgraphix.net/r/Unicode/20D0-20FF

const CHAR_MAPPINGS = [
	ENCLOSED_LIGHT,
	CHEROKEE,
	MATH_01,
]


const CHAR_MAPPINGS_BY_ID: { [k: string]: CharMapping } = CHAR_MAPPINGS.reduce((acc, mapping) => {
	acc[mapping.id] = mapping
	return acc
}, {} as any)

////////////////////////////////////

export {
	CHAR_MAPPINGS,
	CHAR_MAPPINGS_BY_ID,
}

////////////////////////////////////
