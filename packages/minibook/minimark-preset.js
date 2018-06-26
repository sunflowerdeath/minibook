const tocPlugin = require('minimark-plugin-table-of-contents')
const propsDocPlugin = require('minimark-plugin-propsdoc')
const fencePlugin = require('minimark-plugin-fence')

module.exports = {
	gfm: true,
	commonmark: true,
	allowDangerousHTML: true,
	mdPlugins: [tocPlugin, propsDocPlugin, fencePlugin]
}
