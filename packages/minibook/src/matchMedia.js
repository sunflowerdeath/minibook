import React, { Component } from 'react'

export default queries => WrappedComponent => {
	const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name

	class MatchMedia extends Component {
		static displayName = wrappedComponentName
			? `matchMedia(${wrappedComponentName})`
			: 'matchMedia'

		constructor() {
			super()

			this.state = {
				matches: {}
			}
			this.matchers = []
			Object.entries(queries).forEach(([name, query]) => {
				const matcher = window.matchMedia(query)
				this.state.matches[name] = matcher.matches
				const listener = () => {
					this.setState({
						matches: {
							...this.state.matches,
							[name]: matcher.matches
						}
					})
				}
				matcher.addListener(listener)
				this.matchers.push({ matcher, listener })
			})
		}

		componentWillUnmount() {
			this.matchers.forEach(({ matcher, listener }) =>
				matcher.removeListener(listener)
			)
		}

		render() {
			return <WrappedComponent {...this.props} matchedMedia={this.state.matches} />
		}
	}

	return MatchMedia
}
