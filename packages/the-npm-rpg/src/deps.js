const prettyjson = require('prettyjson')
const boxify = require('boxen')
const stylizeString = require('chalk')
const wrapLines = require('linewrap')
const ansiEscapes = require('ansi-escapes')

// code taken from https://github.com/sindresorhus/clear-cli
// The MIT License (MIT)
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
function clearCli() {
	process.stdout.write(ansiEscapes.clearScreen)
}

function prettifyJson(data, options) {
	return prettyjson.render(data, options)
}

module.exports = {
	prettifyJson,
	boxify,
	stylizeString,
	wrapLines,
	clearCli,
}
