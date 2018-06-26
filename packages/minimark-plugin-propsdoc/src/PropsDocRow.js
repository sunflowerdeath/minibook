import React from 'react'
import floral from 'floral'

import propTypeToString from './propTypeToString'
import Shape from './Shape'

const rowStyles = ({ odd }) => ({
	root: {
		background: odd ? '#f2f2f2' : '#f8f8f8',
		padding: '16px 16px 1px'
	},
	head: {
		marginBottom: 16
	}
})

const PropsDocRow = floral(rowStyles)(props => {
	const { name, propInfo, computedStyles } = props
	const { type, defaultValue, required } = propInfo

	let typeElem
	if (type) {
		typeElem = (
			<div>
				Type: <code>{propTypeToString(type)}</code>
			</div>
		)
	}

	let defaultValueElem
	if (defaultValue && defaultValue.value) {
		defaultValueElem = (
			<div>
				Default: <code>{defaultValue.value}</code>
			</div>
		)
	}

	return (
		<div style={computedStyles.root}>
			<div style={computedStyles.head}>
				<div>
					<b>{name}</b>
				</div>
				{typeElem}
				{required && (
					<div>
						<i>Required</i>
					</div>
				)}
				{type.name === 'shape' && <Shape type={type} />}
				{defaultValueElem}
			</div>
			{propInfo.description}
		</div>
	)
})

export default PropsDocRow
