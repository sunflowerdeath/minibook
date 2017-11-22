import React from 'react'
import ReactDOM from 'react-dom'
import MiniBook from 'minibook'

import HelloWorld from './HelloWorld'
import MarkdownStory from './markdown.md'

const sections = {
	example: {
		name: 'Section',
		component: HelloWorld,
		stories: {
			props: {
				name: 'Component',
				description: 'Story description',
				props: {
					name: 'Minibook'
				}
			},
			render: {
				name: 'Render function',
				description: 'You can provide custom render function for a story',
				props: {
					name: 'Render'
				},
				render: (Component, props) => <Component {...props} />
			},
			iframe: {
				name: 'Iframe',
				description: 'Story can be another page displayed in the iframe',
				src: '/some/page.html'
			},
			'markdown-with-example': {
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
