#!/usr/bin/env node
'use strict';

console.log('The boring RPG');

const stylize = require('chalk')

// http://jrgraphix.net/r/Unicode/2460-24FF
const enclosed_set = [
	parseInt('24ea', 16),
	[parseInt('2460', 16), parseInt('2473', 16)], // numbers
	[parseInt('24b6', 16), parseInt('24e9', 16)], // letters
];

const monsters_set = [
	[parseInt('1f400', 16), parseInt('1f43f', 16)], // animals 1
	parseInt('1f5ff', 16),
	parseInt('1f47b', 16),
	parseInt('1f54a', 16),
	parseInt('1f577', 16),
	[parseInt('1f980', 16), parseInt('1f991', 16)], // animals 2
];

//const set = enclosed_set
//const set = monsters_set
const set = [[parseInt('1d400', 16), parseInt('1d433', 16)]]

function render_set(set) {
	console.log('----')
	set.forEach(e => {
		if (typeof e === 'number')
			render_codepoint(e)
		else {
			const [min, max] = e
			for (let i = min; i <= max; ++i) {
				render_codepoint(i)
			}
		}
	})
	console.log('----')
}

function render_codepoint(codepoint) {
	console.log(String.fromCodePoint(codepoint))
	return
	//console.log(`${stylize.dim(i.toString(16).padStart(6, '0') + ' "⋄')}${String.fromCodePoint(i)}${stylize.dim('⋄"  ')}`)

	console.log(`
	'${codepoint.toString(16).padStart(6, '0')}': {
		code_point: ${codepoint},
		char: '${String.fromCodePoint(codepoint)}',
		taxonomy: [ 'animal', 'living', 'monster' ],
		tags: [ 'emoji' ],
		CLDR_short_name: '?',
		gendered: false,
		skin_colorizable: false,
		properties: {
			description: '???',
		},
	},`)
}

render_set(set)
