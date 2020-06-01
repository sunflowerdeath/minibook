import React, { useState } from 'react'
import { useStyles } from 'floral'
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

const AnchorHeading = props => {
	const { id, level, first, children } = props
	const [tapState, setTapState] = useState({})
	const computedStyles = useStyles(styles, [props, tapState])
	return (
		<div id={id} style={computedStyles.root}>
			<Taply
				onChangeTapState={setTapState}
				isFocusable={false}
			>
				<MinimarkRenderer
					component="Heading"
					level={level}
					first={first}
				>
					<a href={`#${id}`} style={computedStyles.link}>
						#
					</a>
					{children}
				</MinimarkRenderer>
			</Taply>
		</div>
	)
}

export default AnchorHeading
