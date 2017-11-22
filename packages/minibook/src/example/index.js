import React from 'react'
import ReactDOM from 'react-dom'
import MiniBook from '../index'

import HelloWorld from './HelloWorld'
import MarkdownWithExampleStory from './markdownWithExample.md'

const sections = {
	example: {
		name: 'Example',
		description: 'Section description',
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
				name: MarkdownWithExampleStory.attributes.name,
				description: MarkdownWithExampleStory.attributes.description,
				render: MarkdownWithExampleStory.render
			}
		}
	}
}

ReactDOM.render(
	<MiniBook title="Minibook" sections={sections} />,
	document.querySelector('.container')
)
