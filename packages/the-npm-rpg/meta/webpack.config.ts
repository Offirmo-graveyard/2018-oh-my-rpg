// I just copied that:
// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
// , I don't understand what I'm doing :-]

const path = require('path')

module.exports = {
	target: 'node',
	entry: {
		main: './src/index.js'
	},
	output: {
		path: path.join(__dirname, '../dist'),
		filename: 'bundled.js',
	},
	externals: {
		conf: 'commonjs conf',
		globalize: 'commonjs globalize',
		'cldr-data': 'commonjs cldr-data',
	}
}


/*
const GlobalizePlugin = require('globalize-webpack-plugin')
new GlobalizePlugin({
	production: false,
	developmentLocale: 'en',
	supportedLocales: [ 'fr', 'en' ],
	messages: 'messages/[locale].json',
	output: 'i18n/[locale].[hash].js'
})


const webpack = require( 'webpack' );
const CommonsChunkPlugin = require( 'webpack/lib/optimize/CommonsChunkPlugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const nopt = require( 'nopt' );

const options = nopt({
	production: Boolean
});

module.exports = {
	entry: options.production ?  {
		main: './app/index.js',
		vendor: [
			'globalize',
			'globalize/dist/globalize-runtime/number',
			'globalize/dist/globalize-runtime/currency',
			'globalize/dist/globalize-runtime/date',
			'globalize/dist/globalize-runtime/message',
			'globalize/dist/globalize-runtime/plural',
			'globalize/dist/globalize-runtime/relative-time',
			'globalize/dist/globalize-runtime/unit'
		]
	} : './app/index.js',
	output: {
		path: options.production ? __dirname + './dist' : __dirname + './tmp',
		publicPath: options.production ? '' : 'http://localhost:8080/',
		filename: options.production ? 'app.[hash].js' : 'app.js'
	},
	resolve: {
		extensions: [ '.js' ]
	},
	plugins: [
		new HtmlWebpackPlugin({
			production: options.production,
			template: './index-template.html'
		}),
		new GlobalizePlugin({
			production: options.production,
			developmentLocale: 'en',
			supportedLocales: [ 'ar', 'de', 'en', 'es', 'pt', 'ru', 'zh' ],
			messages: 'messages/[locale].json',
			output: 'i18n/[locale].[hash].js'
		})
	].concat( options.production ? [
		new webpack.optimize.DedupePlugin(),
		new CommonsChunkPlugin( 'vendor', 'vendor.[hash].js' ),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	] : [] )
};
*/
