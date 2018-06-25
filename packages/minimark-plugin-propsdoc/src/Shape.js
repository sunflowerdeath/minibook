import React from 'react'
import MinimarkRenderer from 'minimark-renderer'

import propTypeToString from './propTypeToString'

const NDASH = '–'

const Shape = ({ type }) => (
	<MinimarkRenderer component="List" style={{ marginBottom: 0 }}>
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

export default Shape
