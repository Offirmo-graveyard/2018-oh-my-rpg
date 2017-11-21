const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const PACKAGE_JSON_PATH = path.join('..', 'package.json')
const { version } = require(PACKAGE_JSON_PATH)

const config = {
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, '..'),
		filename: 'index_bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/, // https://github.com/babel/babel/issues/6041
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new webpack.DefinePlugin({
			'VERSION': JSON.stringify(version),
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	]
}


if (process.env.NODE_ENV === 'production') {
	config.plugins.push(
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			}
		}),
		new webpack.optimize.UglifyJsPlugin()
	)
}
else {
	config.devServer = {
		historyApiFallback: true,
	}
}

module.exports = config;
