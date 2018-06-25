import React from 'react'
import ReactDOM from 'react-dom'
import MiniBook from 'minibook'
import 'minibook/lib/styles.css'

import Button from './Button'
import Markdown, { attributes } from './markdown.md'
import MarkdownPlugins from './markdown-plugins.md'

import { MinimarkContext } from 'minimark-renderer'
import Fence from 'minimark-plugin-fence/lib/Fence'
import TableOfContents from 'minimark-plugin-table-of-contents/lib/TableOfContents'
import AnchorHeading from 'minimark-plugin-table-of-contents/lib/AnchorHeading'
import PropsDoc from 'minimark-plugin-propsdoc/lib/PropsDoc'

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
				description:
					'You can provide custom render function for a story',
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
				description:
					'Story can be another page displayed in the iframe',
				src: '/page.html'
			},
			// markdown: Markdown,
			markdown: {
				name: attributes.name,
				description: attributes.description,
				render: () => (
					<MinimarkContext.Provider
						value={{ AnchorHeading, TableOfContents, Fence, PropsDoc }}
					>
						<Markdown />
					</MinimarkContext.Provider>
				)
			},
			'markdown-plugins': {
				name: 'Markdown plugins',
				render: () => (
					<MinimarkContext.Provider
						value={{ AnchorHeading, TableOfContents, Fence, PropsDoc }}
					>
						<MarkdownPlugins />
					</MinimarkContext.Provider>
				)
			}
		}
	}
}

ReactDOM.render(
	<MiniBook title="Minibook" sections={sections} />,
	document.querySelector('#root')
)
