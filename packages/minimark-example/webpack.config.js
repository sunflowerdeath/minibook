const baseConfig = require('gnoll/config/webpack')
const babelConfig = require('gnoll/config/babel')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const minimarkTocPlugin = require('minimark-plugin-table-of-contents')
const minimarkFencePlugin = require('minimark-plugin-fence')

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
							commonmark: true,
							mdPlugins: [minimarkTocPlugin, minimarkFencePlugin]
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
