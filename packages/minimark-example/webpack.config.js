const baseConfig = require('gnoll/config/webpack')
const babelConfig = require('gnoll/config/babel')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseConfig, {
	entry: './src/index.js',
	plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
	module: {
		rules: [
			{
				test: /\.md$/,
				use: [
					{ loader: 'babel-loader', options: babelConfig },
					{
						loader: 'minimark-loader',
						options: {
							allowDangerousHTML: true,
							gfm: true,
							commonmark: true
						}
					}
				]
			}
		]
	},
	devServer: {
		port: 1337,
		historyApiFallback: true,
		host: '0.0.0.0'
	}
})
