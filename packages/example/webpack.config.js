const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PRODUCTION = process.env.NODE_ENV === 'production'

const plugins = [
	new HtmlWebpackPlugin({ template: './src/index.html' }),
	new HtmlWebpackPlugin({
		template: './src/page.html',
		filename: 'page.html',
		inject: false
	}),
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
				test: /\.css/,
				use: ['style-loader', 'css-loader']
			},
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
					{ loader: 'minimark-loader' }
					// { loader: 'minibook-loader' }
				]
			}
		]
	},
	devtool: PRODUCTION ? undefined : 'cheap-module-source-map',
	resolve: {
		modules: ['node_modules', path.resolve(__dirname, 'node_modules')],
		symlinks: false
	},
	devServer: {
		port: 1337,
		historyApiFallback: true,
		host: '0.0.0.0'
	}
}
