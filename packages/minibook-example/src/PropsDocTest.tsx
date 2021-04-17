import React from 'react'

interface TestProps {
	/** This prop has default value. */
	number: number,

	/** This prop is required. */
	func: (arg: string) => number,

	/**
	 * You can use markdown *in* the **description** `OMG`!
	 *
	 * - list
	 * - list
	 */
	bool: boolean,

	enum: 'first' | 'second',

	// Union
	union: number | string,

	// Node
	children: React.ReactNode,

	// Instance
	instance: Date,

	// Array
	array: number[],

	// Object
	object: { [key:string]: number },

	/** Object with shape */
	shape: {
        optional?: string,
        required: number
	},

	/** Nested shape */
	nestedShape: {
		/** Field description */
		optional?: string,
		required: number,
		shape: {
			/** Field description */
			optional?: string,
			required: number
		}
	},

	// Any
	any: any,
}

const Test = (props: TestProps) => <div>Button</div>

Test.defaultProps = {
	number: 1,
	enum: 'first',
	shape: {
		num: 1,
		str: 'STR'
	}
}

export default Test
