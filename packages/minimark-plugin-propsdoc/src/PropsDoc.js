import React from 'react'
import PropTypes from 'prop-types'

import PropsDocRow from './PropsDocRow'

const PropsDoc = ({ propsInfo }) => (
	<div style={{ marginBottom: 16 }}>
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

PropsDoc.propTypes = {
	propsInfo: PropTypes.object.isRequired
}

export default PropsDoc
