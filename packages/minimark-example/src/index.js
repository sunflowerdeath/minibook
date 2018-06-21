import ReactDOM from 'react-dom'
import React from 'react'
import { MinimarkContext } from 'minimark-renderer'

import TableOfContents from 'minimark-plugin-table-of-contents/lib/TableOfContents'
import Fence from 'minimark-plugin-fence/lib/Fence'

import MarkdownDocument, { attributes } from './example.md'

const Example = () => {
	return (
		<MinimarkContext.Provider value={{ TableOfContents, Fence }}>
			<div style={{ width: 800, margin: 'auto' }}>
				<MarkdownDocument />
			</div>
		</MinimarkContext.Provider>
	)
}

ReactDOM.render(<Example />, document.querySelector('#root'))
