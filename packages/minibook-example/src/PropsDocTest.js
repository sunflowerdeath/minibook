import React from 'react'
import PropTypes from 'prop-types'

const Test = () => <div>Button</div>

Test.propTypes = {
	// Number
	number: PropTypes.number.isRequired,

	/** Function */
	func: PropTypes.func.isRequired,

	/** Bool */
	bool: PropTypes.bool,

	/** Enum */
	enum: PropTypes.oneOf(['first', 'second']),

	// Union
	union: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

	// Node
	children: PropTypes.node,

	// Instance
	instance: PropTypes.instanceOf(Date),

	// Array
	array: PropTypes.arrayOf(PropTypes.number),

	// Object
	object: PropTypes.objectOf(PropTypes.number),

	/** Object with shape */
	shape: PropTypes.shape({
		/** description */
		optional: PropTypes.string,
		required: PropTypes.number.isRequired
	}),

	/** Object with shape */
	shapeInShape: PropTypes.shape({
		/** Description */
		optional: PropTypes.string,
		required: PropTypes.number.isRequired,
		shape: PropTypes.shape({
			/** Description */
			optional: PropTypes.string,
			required: PropTypes.number.isRequired
		})
	}),

	// Any
	any: PropTypes.any,

	// Custom
	custom: value => value === 2
}

Test.defaultProps = {
	number: 1,
	enum: 'first',
	shape: {
		num: 1,
		str: 'STR'
	}
}

export default Test
