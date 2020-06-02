import React, { useContext } from 'react'

import styledComponents from './styledComponents'
import MinimarkContext, { useTheme } from './context'

const MinimarkRenderer = ({ component, ...restProps }) => {
	const { components } = useContext(MinimarkContext)
	const Component =
		(components && components[component]) || styledComponents[component]
	if (!Component) {
		throw new Error(
			`MinimarkRenderer: Component "${component}" is not provided!`
		)
	}
	return React.createElement(Component, restProps)
}

export default MinimarkRenderer
export { MinimarkContext, useTheme }
