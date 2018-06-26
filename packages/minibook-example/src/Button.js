import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ primary, onClick, disabled, children }) => {
	const style = {
		borderRadius: 5,
		display: 'inline-block',
		padding: '10px 15px',
		cursor: 'pointer'
	}

	if (disabled) {
		style.color = '#999'
		style.background = '#eee'
	} else if (primary) {
		style.background = '#0088ff'
		style.color = 'white'
	} else {
		style.background = '#eee'
	}

	return (
		<div style={style} onClick={onClick} role="button" tabIndex="0">
			{children}
		</div>
	)
}

Button.propTypes = {
	/** Some description */
	primary: PropTypes.bool,

	/**
	 * Description *with* **markdown**!
	 *
	 * - A
	 * - B
	 */
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	children: PropTypes.node
}

export default Button
