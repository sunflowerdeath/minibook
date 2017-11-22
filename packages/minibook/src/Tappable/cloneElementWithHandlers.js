import React from 'react'

export default function cloneElementWithHandlers(elem, props) {
	const newProps = {}
	Object.entries(props).forEach(([key, value]) => {
		const prevValue = elem.props[key]
		if (typeof value === 'function' && typeof prevValue === 'function') {
			newProps[key] = (...args) => {
				prevValue(...args)
				value(...args)
			}
		} else {
			newProps[key] = value
		}
	})
	return React.cloneElement(elem, newProps)
}
