const propTypeToString = type => {
	if (type.name === 'func') return 'function'
	if (type.name === 'custom') return type.raw

	/*
	From:
	{
		name: 'union',
		value: [
			{ name: 'number' },
			{ name: 'string' }
		]
	}
	To: 'number|string'
	*/
	if (type.name === 'union') return type.value.map(propTypeToString).join('|')

	/*
	From:
	{
		name: 'enum',
		value: [
			{ value: "'a'", computed: false },
			{ value: "'b'", computed: false }
		]
	}
	To: 'a'|'b'
	*/
	if (type.name === 'enum') return type.value.map(val => val.value).join('|')

	/*
	From: { name: 'instanceOf', value: 'Class' } 
	To: 'Class'
	*/
	if (type.name === 'instanceOf') return type.value

	/*
	From: { name: 'arrayOf', value: { name: 'number' } }
	To: 'array<number>'
	*/
	if (type.name === 'arrayOf') {
		return `array<${propTypeToString(type.value)}>`
	}

	/*
	From: { name: 'objectOf', value: { name: 'number' } }
	To: 'object<number>'
	*/
	if (type.name === 'objectOf') {
		return `object<${propTypeToString(type.value)}>`
	}

	// Rest info is rendered in other place
	if (type.name === 'shape') return 'object'

	return type.name
}

module.exports = propTypeToString
