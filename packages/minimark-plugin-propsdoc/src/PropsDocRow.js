import React, { useContext } from 'react'
import { useStyles } from 'floral'
import { MinimarkThemeContext } from 'minimark-renderer/lib/context'

import propTypeToString from './propTypeToString'
import Shape from './Shape'

const styles = ({ odd }, theme) => ({
	root: {
		background: odd ? theme.border : theme.highlight,
		padding: '16px 16px 1px'
	},
	head: {
		marginBottom: 16
	}
})

const PropsDocRow = props => {
	const { name, propInfo } = props
	const { type, defaultValue, required } = propInfo
	const theme = useContext(MinimarkThemeContext)
	const computedStyles = useStyles(styles, [props, theme])

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
}

export default PropsDocRow
