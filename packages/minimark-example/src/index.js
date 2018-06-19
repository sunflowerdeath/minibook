import ReactDOM from 'react-dom'
import React from 'react'
import { MinimarkContext } from 'minimark-renderer'

import MarkdownDocument, { attributes } from './example.md'
console.log(MarkdownDocument)

const Example = () => {
	console.log(MarkdownDocument)
	return (
		<div style={{ width: 800, margin: 'auto' }}>
			<MarkdownDocument />
		</div>
	)
}

ReactDOM.render(
	<Example />,
	document.querySelector('#root')
)
