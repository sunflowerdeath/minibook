import React from 'react'
import { useStyles } from 'floral'
import { useTheme } from 'minimark-renderer'

import propTypeToString from './propTypeToString'
import Shape from './Shape'

const styles = ({ odd }, theme) => ({
	root: {
		background: odd ? theme.border : theme.highlight,
		padding: '16px 16px 1px',
	},
	head: {
		marginBottom: 16,
	},
})

const flowTypeToString = (flowType) => {
	let { name, type, raw, elements } = flowType
	if (elements) {
		return `${name}<${elements.join(', ')}>`
	}
	if (name === 'signature') {
		return raw
	}
}

const PropsDocRow = (props) => {
	const { name, propInfo } = props
	const theme = useTheme()
	const computedStyles = useStyles(styles, [props, theme])

	const { type, flowType, defaultValue, required } = propInfo

	let flowElem
	if (flowType) {
		let { name, raw } = flowType
		flowElem = (
			<div>
				Type:{' '}
				<code style={{ whiteSpace: 'break-spaces' }}>{raw || name}</code>
			</div>
		)
	}

	let typeElem, shapeElem
	if (type) {
		typeElem = (
			<div>
				Type: <code>{propTypeToString(type)}</code>
			</div>
		)
		shapeElem = type.name === 'shape' && <Shape type={type} />
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
				{flowElem}
				{required && (
					<div>
						<i>Required</i>
					</div>
				)}
				{defaultValueElem}
				{shapeElem}
			</div>
			{propInfo.description}
		</div>
	)
}

export default PropsDocRow
