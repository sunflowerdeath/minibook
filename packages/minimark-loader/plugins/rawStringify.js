const nanoid = require('nanoid')

class RawValue {
	constructor(value) {
		this.value = value
	}
}

const rawStringify = object => {
	const replacements = {}
	let string = JSON.stringify(object, (key, value) => {
		if (value instanceof RawValue) {
			const id = `REPLACE_${nanoid()}`
			replacements[id] = value.value
			return id
		}
		return value
	})
	for (const [id, value] of Object.entries(replacements)) {
		string = string.replace(`"${id}"`, value)
	}
	return string
}

rawStringify.RawValue = RawValue

module.exports = rawStringify
