import React from 'react'

import styledComponents from './styledComponents'

const MinimarkContext = React.createContext()

const MinimarkRenderer = ({ component, ...restProps }) => (
	<MinimarkContext.Consumer>
		{providedComponents => {
			const Component =
				(providedComponents && providedComponents[component]) ||
				styledComponents[component]
			if (!Component) {
				throw new Error(
					`MinimarkRenderer: Component "${
						component
					}" is not provided!`
				)
			}
			return React.createElement(Component, restProps)
		}}
	</MinimarkContext.Consumer>
)

export default MinimarkRenderer
export { MinimarkContext }
