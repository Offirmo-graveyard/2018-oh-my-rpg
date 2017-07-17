// I just copied that:
// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
// , I don't understand what I'm doing :-]

const path = require('path')

module.exports = {
	entry: './index.js',
	target: 'node',
	output: {
		path: path.join(__dirname, '../dist'),
		filename: 'bundled.js',
	},
	externals: {
		conf: 'commonjs conf',
	}
}
