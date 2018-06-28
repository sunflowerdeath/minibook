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
			marginBottom: 16
		}
	},
	Heading: ({ level, first }) => ({
		root: {
			fontSize: ['32px', '24px', '20px', '16px', '16px'][level - 1],
			marginBottom: 16,
			marginTop: first ? 24 : 0,
			fontWeight: 'bold',
			lineHeight: '1.25',
			...(level === 1 && {
				paddingBottom: 8,
				borderBottom: '1px solid #eee'
			})
		}
	}),
	Blockquote: {
		root: {
			paddingLeft: 16,
			color: '#666',
			borderLeft: '4px solid #eee',
			marginLeft: 0
		}
	},
	Code: {
		root: {
			marginTop: 0,
			marginBottom: 16,
			padding: 10,
			fontSize: '14px',
			background: '#f2f2f2',
			whiteSpace: 'pre-wrap'
		}
	},
	List: {
		root: {
			paddingLeft: 32,
			marginTop: 0,
			marginBottom: 16
		}
	},
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
	Table: {
		root: {
			borderCollapse: 'collapse'
		}
	},
	TableRow: {},
	TableCell: ({ header }) => ({
		root: {
			border: '1px solid #eee',
			padding: '5px 10px',
			fontWeight: header ? 'bold' : 'normal'
		}
	})
}

const styledComponents = {}
for (const [name, component] of Object.entries(baseComponents)) {
	styledComponents[name] = extendComponentStyles(component, styles[name])
}

export default styledComponents
