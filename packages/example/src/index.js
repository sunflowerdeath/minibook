import React from 'react'
import ReactDOM from 'react-dom'
import MiniBook from 'minibook'

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
				render: (Component, props) => (
					<Component {...props} onClick={() => alert('Click')} />
				)
			},
			iframe: {
				name: 'Iframe',
				description: 'Story can be another page displayed in the iframe',
				src: '/frame.html'
			},
			'markdown': {
				name: MarkdownStory.attributes.name,
				description: MarkdownStory.attributes.description,
				render: MarkdownStory.render
			}
		}
	}
}

ReactDOM.render(
	<MiniBook title="Minibook" sections={sections} />,
	document.querySelector('.container')
)
