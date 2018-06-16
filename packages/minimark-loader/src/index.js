const build = require('./build')

module.exports = function loader(content) {
	const res = build(content, this.query)
	console.log(res)
	return res
	// this.resourcePath
}
