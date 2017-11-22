const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PRODUCTION = process.env.NODE_ENV === 'production'

const plugins = [
	new HtmlWebpackPlugin({ template: './node_modules/minibook/webpack/template.html' }),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV)
		}
	})
]

if (PRODUCTION) plugins.push(new webpack.optimize.UglifyJsPlugin())

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve('./build'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins,
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				loader: 'babel-loader',
				options: {
					presets: ['env', 'stage-0', 'react']
				}
			},
			{
				test: /\.md$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['env', 'stage-0', 'react']
						}
					},
					{ loader: 'minibook-loader' }
				]
			}
		]
	},
	devtool: PRODUCTION ? undefined : 'cheap-module-source-map',
	resolve: {
		modules: [
		  'node_modules',
		  path.resolve(__dirname, 'node_modules')
		]
	},
	devServer: {
		port: 1337,
		historyApiFallback: true
	}
}
