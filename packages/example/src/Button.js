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
		<div style={style} onClick={onClick}>
			{children}
		</div>
	)
}

Button.propTypes = {
	primary: PropTypes.bool,
	onClick: PropTypes.func,
	disabled: PropTypes.bool
}

export default Button
