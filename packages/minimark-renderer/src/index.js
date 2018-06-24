import React from 'react'

import styledComponents from './styledComponents'

const MinimarkContext = React.createContext()

const MinimarkRenderer = ({ component, ...restProps }) => (
	<MinimarkContext.Consumer>
		{providedComponents =>
			React.createElement(
				(providedComponents && providedComponents[component]) ||
					styledComponents[component],
				restProps
			)
		}
	</MinimarkContext.Consumer>
)

export default MinimarkRenderer
export { MinimarkContext }
