import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import floral from 'floral'
import MinimarkRenderer from 'minimark-renderer'

import propTypeToString from './propTypeToString'

const NDASH = '–'

const Shape = ({ type }) => (
	<MinimarkRenderer component="List" style={{ marginBottom: 0, fontSize: '14px' }}>
		{Object.entries(type.value).map(([name, fieldType]) => (
			<MinimarkRenderer component="ListItem" key={name}>
				<b>{name}</b> <code>{propTypeToString(fieldType)}</code>
				{fieldType.required && <i> (required)</i>}
				{fieldType.description && ` ${NDASH} ${fieldType.description}`}
				{fieldType.name === 'shape' && <Shape type={fieldType} />}
			</MinimarkRenderer>
		))}
	</MinimarkRenderer>
)

const rowStyles = ({ odd }) => ({
	root: {
		background: odd ? '#f2f2f2' : '#f8f8f8',
		padding: '16px 16px 1px'
	},
	head: {
		marginBottom: 16
	}
})

const Row = floral(rowStyles)(props => {
	const { name, propInfo, children, computedStyles } = props
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
			{propInfo.description && (
				<MinimarkRenderer component="Paragraph">
					{propInfo.description}
				</MinimarkRenderer>
			)}
		</div>
	)
})

const PropsDoc = ({ propsInfo }) => (
	<div style={{ marginBottom: 16 }}>
		{Object.entries(propsInfo).map(([name, propInfo], index) => (
			<Row
				key={name}
				name={name}
				propInfo={propInfo}
				odd={index % 2 === 1}
			/>
		))}
	</div>
)

PropsDoc.propTypes = {
	propsInfo: PropTypes.object.isRequired
}

export default PropsDoc
