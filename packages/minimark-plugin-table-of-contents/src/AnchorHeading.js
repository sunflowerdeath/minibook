import React, { Component } from 'react'
import floral from 'floral'
import Taply from 'taply'
import MinimarkRenderer from 'minimark-renderer'

const styles = (props, { isHovered }) => ({
	root: {
		position: 'relative'
	},
	link: {
		fontWeight: 'normal',
		position: 'absolute',
		left: -20,
		width: 20,
		textAlign: 'center',
		display: isHovered ? 'block' : 'none'
	}
})

@floral(styles)
class AnchorHeading extends Component {
	state = {
		isHovered: false
	}

	render() {
		const { id, level, children } = this.props
		const { computedStyles } = this.state
		return (
			<div id={id} style={computedStyles.root}>
				<Taply
					onChangeTapState={tapState => this.setState(tapState)}
					isFocusable={false}
				>
					<MinimarkRenderer component="Heading" level={level}>
						<a href={`#${id}`} style={computedStyles.link}>
							#
						</a>
						{children}
					</MinimarkRenderer>
				</Taply>
			</div>
		)
	}
}

export default AnchorHeading
