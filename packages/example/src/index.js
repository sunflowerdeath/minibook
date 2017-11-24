import React from 'react'
import ReactDOM from 'react-dom'
import MiniBook from 'minibook'
import 'minibook/lib/styles.css'

import Button from './Button'
import MarkdownStory from './markdown.md'

const sections = {
	example: {
		name: 'Section',
		component: Button,
		stories: {
			props: {
				name: 'Component',
				description: 'Story description',
				props: {
					children: 'Button'
				}
			},
			render: {
				name: 'Render function',
				description: 'You can provide custom render function for a story',
				props: {
					children: 'Click me!'
				},
				// eslint-disable-next-line react/display-name
				render: (Component, props) => (
					<Component {...props} onClick={() => alert('Click')} />
				)
			},
			iframe: {
				name: 'Iframe',
				description: 'Story can be another page displayed in the iframe',
				src: '/page.html'
			},
			markdown: MarkdownStory
		}
	}
}

ReactDOM.render(
	<MiniBook title="Minibook" sections={sections} />,
	document.querySelector('.container')
)
