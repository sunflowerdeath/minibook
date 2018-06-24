const fs = require('fs')
const path = require('path')
const docgen = require('react-docgen')

const propTypeToString = require('../propTypeToString')

const src = fs.readFileSync(path.join(__dirname, './test.js'))
const componentInfo = docgen.parse(src)

/*
const stringProps = {}
for (const [name, propInfo] of Object.entries(componentInfo.props)) {
	stringProps[name] = propTypeToString(propInfo.type)
}

console.log(stringProps)
*/

console.dir(componentInfo.props.shape, { depth: null })
console.log(propTypeToString(componentInfo.props.shape))
