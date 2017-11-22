import React from 'react'

export default function cloneReferencedElement(element, props, ...children) {
	const originalRef = element.ref
	const newRef = props.ref

	if (!originalRef || !newRef) {
		return React.cloneElement(element, props, ...children)
	}

	if (typeof originalRef === 'string') {
		if (process.env.NODE_ENV !== 'production') {
			console.warn(
				`Cloning an element with string ref is not supported. Use function ref.`
			)
			console.warn(`Ignored ref: ${originalRef}`)
		}
		return React.cloneElement(element, props, ...children)
	}

	return React.cloneElement(
		element,
		{
			...props,
			ref: component => {
				originalRef(component)
				newRef(component)
			}
		},
		...children
	)
}
