import { createElement, createContext, useContext, forwardRef } from 'react'

import MinimarkContext, { useTheme } from './context'
import defaultComponents from './components'

interface MinimarkRendererProps {
	component: string
}

const MinimarkRenderer = forwardRef((props: MinimarkRendererProps, ref) => {
	const { component, ...restProps } = props
	const { components } = useContext(MinimarkContext)
	const Component =
		(components && components[component]) || defaultComponents[component]
	if (!Component) {
		throw new Error(
			`MinimarkRenderer: Component "${component}" is not provided!`
		)
	}
	return createElement(Component, { ...restProps, ref })
})

export default MinimarkRenderer
export { MinimarkContext, useTheme }
