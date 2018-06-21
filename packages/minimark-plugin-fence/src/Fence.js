import React from 'react'

import MinimarkRenderer from 'minimark-renderer'

const Fence = ({ code, lang, children }) => (
	<div>
		{children && <div style={{ border: '1px solid red' }}>{children}</div>}
		{code && <MinimarkRenderer component="Code" lang={lang} code={code} />}
	</div>
)

export default Fence
