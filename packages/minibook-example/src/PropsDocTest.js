/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import PropTypes from 'prop-types'

const Test = () => <div>Button</div>

Test.propTypes = {
	/** This prop has default value. */
	number: PropTypes.number,

	/** This prop is required. */
	func: PropTypes.func.isRequired,

	/**
	 * You can use markdown *in* the **description** `OMG`!
	 *
	 * - list
	 * - list
	 */
	bool: PropTypes.bool,

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

	/** Nested shape */
	nestedShape: PropTypes.shape({
		/** Field description */
		optional: PropTypes.string,
		required: PropTypes.number.isRequired,
		shape: PropTypes.shape({
			/** Field description */
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
