module.exports = {
	extends: ['gnoll'],
	rules: {
		'react/jsx-filename-extension': 'off',
		'react/require-default-props': 'off',
		'react/no-find-dom-node': 'off',
		'react/forbid-prop-types': 'off',
		'import/no-webpack-loader-syntax': 'off',
		'import/no-unresolved': ['error', { ignore: ['react', 'react-dom'] }],
		'import/extensions': 'off'
	}
}
