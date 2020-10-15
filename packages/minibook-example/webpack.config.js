const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PRODUCTION = process.env.NODE_ENV === 'production'

const plugins = [
	new HtmlWebpackPlugin({ template: './src/index.html' }),
	new HtmlWebpackPlugin({
		template: './src/page.html',
		filename: 'page.html',
		inject: false
	})
]

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve('./build'),
		publicPath: '/'
	},
	mode: PRODUCTION ? 'production' : 'development',
	plugins,
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', '@babel/preset-react']
				}
			},
			{
				test: /\.md$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react']
						}
					},
					{
						loader: 'minimark-loader',
						options: require('minibook/minimark-preset')
					}
				]
			}
		]
	},
	devtool: PRODUCTION ? undefined : 'cheap-module-source-map',
	devServer: {
		port: 1337,
		historyApiFallback: true,
		host: '0.0.0.0'
	}
}
