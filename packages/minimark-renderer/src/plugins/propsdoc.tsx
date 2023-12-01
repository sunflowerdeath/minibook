import React from 'react'
import { useStyles } from 'floral'

import MinimarkRenderer, { useTheme } from '../index'

const propTypeToString = (type) => {
	if (type.name === 'func') return 'function'
	if (type.name === 'custom') return type.raw

	/*
	From:
	{
		name: 'union',
		value: [
			{ name: 'number' },
			{ name: 'string' }
		]
	}
	To: 'number|string'
	*/
	if (type.name === 'union') return type.value.map(propTypeToString).join('|')

	/*
	From:
	{
		name: 'enum',
		value: [
			{ value: "'a'", computed: false },
			{ value: "'b'", computed: false }
		]
	}
	To: 'a'|'b'
	*/
	if (type.name === 'enum')
		return type.value.map((val) => val.value).join('|')

	/*
	From: { name: 'instanceOf', value: 'Class' } 
	To: 'Class'
	*/
	if (type.name === 'instanceOf') return type.value

	/*
	From: { name: 'arrayOf', value: { name: 'number' } }
	To: 'array<number>'
	*/
	if (type.name === 'arrayOf') {
		return `array<${propTypeToString(type.value)}>`
	}

	/*
	From: { name: 'objectOf', value: { name: 'number' } }
	To: 'object<number>'
	*/
	if (type.name === 'objectOf') {
		return `object<${propTypeToString(type.value)}>`
	}

	// Rest info is rendered in other place
	if (type.name === 'shape') return 'object'

	return type.name
}

const ndash = '–'

const Shape = ({ type }) => (
	<MinimarkRenderer component="List" style={{ marginBottom: 0 }}>
		{Object.entries(type.value).map(([name, fieldType]) => (
			<MinimarkRenderer component="ListItem" key={name}>
				<b>{name}</b> <code>{propTypeToString(fieldType)}</code>
				{fieldType.required && <i> (required)</i>}
				{fieldType.description && ` ${ndash} ${fieldType.description}`}
				{fieldType.name === 'shape' && <Shape type={fieldType} />}
			</MinimarkRenderer>
		))}
	</MinimarkRenderer>
)

const flowTypeToString = (flowType) => {
	let { name, type, raw, elements } = flowType
	if (elements) {
		return `${name}<${elements.join(', ')}>`
	}
	if (name === 'signature') {
		return raw
	}
}

const propsDocRowStyles = ({ odd }, theme) => ({
	root: {
		background: odd ? theme.border : theme.highlight,
		padding: '1rem 1rem 1px',
	},
	head: {
		marginBottom: '1rem',
	},
})

const PropsDocRow = (props) => {
	const { name, propInfo } = props
	const theme = useTheme()
	const computedStyles = useStyles(propsDocRowStyles, [props, theme])

	const { type, flowType, tsType, defaultValue, required } = propInfo

	let flowTsElem
	if (flowType || tsType) {
		let { name, raw } = flowType || tsType
		flowTsElem = (
			<div>
				Type:{' '}
				<code style={{ whiteSpace: 'break-spaces' }}>
					{raw || name}
				</code>
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
				{flowTsElem}
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

interface PropsDocProps {
	propsInfo: object
}

const PropsDoc = ({ propsInfo }: PropsDocProps) => (
	<div style={{ marginBottom: '1rem' }}>
		{Object.entries(propsInfo).map(([name, propInfo], index) => (
			<PropsDocRow
				key={name}
				name={name}
				propInfo={propInfo}
				odd={index % 2 === 1}
			/>
		))}
	</div>
)

export { PropsDoc, PropsDocRow }
