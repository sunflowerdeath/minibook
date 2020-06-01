import React, { useContext } from 'react'

import styledComponents from './styledComponents'
import { MinimarkComponentsContext } from './context'

const MinimarkRenderer = ({ component, ...restProps }) => {
	const contextComponents = useContext(MinimarkComponentsContext)
	const Component =
		(contextComponents && contextComponents[component]) ||
		styledComponents[component]
	if (!Component) {
		throw new Error(
			`MinimarkRenderer: Component "${component}" is not provided!`
		)
	}
	return React.createElement(Component, restProps)
}

export default MinimarkRenderer
