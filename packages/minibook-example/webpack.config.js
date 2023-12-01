const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve('./build'),
		publicPath: '/',
	},
	mode: isProduction ? 'production' : 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'esbuild-loader',
				options: { loader: 'jsx', jsx: 'automatic' },
			},
			{
				test: /\.md$/,
				use: [
					{
						loader: 'esbuild-loader',
						options: { loader: 'jsx', jsx: 'automatic' },
					},
					{
						loader: 'minimark-loader',
						options: {
							gfm: true,
							commonmark: true,
							allowDangerousHTML: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({ template: './src/index.html' }),
		new HtmlWebpackPlugin({
			template: './src/page.html',
			filename: 'page.html',
			inject: false,
		}),
	],
	devtool: isProduction ? undefined : 'cheap-module-source-map',
	devServer: {
		port: 1777,
		historyApiFallback: true,
		host: '0.0.0.0',
	},
}
