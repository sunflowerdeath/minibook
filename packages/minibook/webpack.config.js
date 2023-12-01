const path = require('path')
const { EsbuildPlugin } = require('esbuild-loader')

const isProduction = process.env.NODE_ENV === 'production'
const src = path.resolve(__dirname, 'src')

const rules = [
	{
		test: /\.(js|jsx)$/,
		include: [src],
		use: [
			{
				loader: 'esbuild-loader',
				options: { loader: 'jsx', jsx: 'automatic' },
			},
		],
	},
	{
		test: /\.(ts|tsx)$/,
		include: [src],
		use: [
			{
				loader: 'esbuild-loader',
				options: { loader: 'tsx', jsx: 'automatic' },
			},
			// { loader: "ts-loader" },
		],
	},
]

module.exports = {
	entry: './src/index.tsx',
	externals: ['react', 'react/jsx-runtime', 'react-dom', 'minimark-renderer'],
	externalsType: 'commonjs',
	output: {
		path: path.resolve(__dirname, './lib'),
		library: { type: 'commonjs' },
	},
	mode: isProduction ? 'production' : 'development',
	module: { rules },
	devtool: 'cheap-module-source-map',
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	optimization: {
		minimizer: [null] //[new EsbuildPlugin({ target: 'es2015' })],
	},
}
