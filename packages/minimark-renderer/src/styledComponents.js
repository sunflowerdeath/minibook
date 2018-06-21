import { extendComponentStyles } from 'floral'

import baseComponents from './baseComponents'

const styles = {
	Root: {
		root: {
			lineHeight: '1.5'
		}
	},
	Paragraph: {
		root: {
			marginTop: 0,
			marginBottom: '16px'
		}
	},
	Heading: ({ depth }) => ({
		root: {
			fontSize: ['32px', '24px', '20px', '16px', '16px'][depth - 1],
			marginBottom: '16px',
			marginTop: '24px',
			fontWeight: 'bold',
			lineHeight: '1.25'
		}
	}),
	Blockquote: {
		root: {
			paddingLeft: '16px',
			color: '#666',
			borderLeft: '4px solid #eee',
			marginLeft: 0
		}
	},
	Code: {
		root: {
			marginTop: 0,
			marginBottom: '16px',
			padding: 10,
			fontSize: '14px',
			background: '#f2f2f2'
		}
	},
	List: {},
	ListItem: {},
	Break: {
		root: {
			height: 4,
			border: 'none',
			padding: 0,
			marginTop: 24,
			marginBottom: 24,
			background: '#eee'
		}
	},
	Table: {},
	TableRow: {},
	TableCell: {}
}

const styledComponents = {}
for (const [name, component] of Object.entries(baseComponents)) {
	styledComponents[name] = extendComponentStyles(component, styles[name])
}

export default styledComponents
