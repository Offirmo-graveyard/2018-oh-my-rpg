#!/usr/bin/env node
'use strict';

console.log('The boring RPG');

const stylize = require('chalk')

//const [min, max] = [1000, 10000]
//const [min, max] = [parseInt('1f000', 16), parseInt('1ffff', 16)]



const set = [
	[parseInt('1f400', 16), parseInt('1f43f', 16)], // animals 1
	parseInt('1f5ff', 16),
	parseInt('1f47b', 16),
	parseInt('1f54a', 16),
	parseInt('1f577', 16),
	[parseInt('1f980', 16), parseInt('1f991', 16)], // animals 2
];


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
