import React from 'react'
import floral from 'floral'

import MinimarkRenderer from 'minimark-renderer'

const styles = {
	root: {
		marginBottom: '16px'
	},
	example: {
		padding: 10,
		border: '1px solid #e4e4e4'
	}
}

const Fence = floral(styles)(({ code, lang, children, computedStyles }) => (
	<div style={computedStyles.root}>
		{children && <div style={computedStyles.example}>{children}</div>}
		{code && <MinimarkRenderer component="Code" lang={lang} code={code} />}
	</div>
))

export default Fence
