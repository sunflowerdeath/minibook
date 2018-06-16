import React from 'react'

import components from './components'

const MinimarkContext = React.createContext(components)

const MinimarkRenderer = ({ component, ...restProps }) => (
	<MinimarkContext.Consumer>
		{providedComponents => {
			return React.createElement(
				providedComponents[component] || components[component],
				restProps
			)
		}
		}
	</MinimarkContext.Consumer>
)

export default MinimarkRenderer
export { MinimarkContext }
