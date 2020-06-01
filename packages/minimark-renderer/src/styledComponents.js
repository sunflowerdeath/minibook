import baseComponents from './baseComponents'

/*
const theme = {
    textColor: '#000',
	secondaryTextColor: '#666',
	borderColor: '#e4e4e4',
	backgroundColor: '#f2f2f2'
}
*/

const theme = {
    text: '#fff',
	secondaryText: '#666',
	border: '#e4e4e4',
	background: '#f2f2f2'
}

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
			marginTop: first ? 0 : 24,
			fontWeight: 'bold',
			lineHeight: '1.25',
			...(level === 1 && {
				paddingBottom: 8,
				borderBottom: `1px solid ${theme.border}`
			})
		}
	}),
	Blockquote: {
		root: {
			paddingLeft: 16,
			color: theme.secondary,
			borderLeft: `4px solid ${theme.border}`,
			marginLeft: 0
		}
	},
	Code: {
		root: {
			marginTop: 0,
			marginBottom: 16,
			padding: 10,
			fontSize: '14px',
			background: theme.background,
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
	ListItem: ({ checked }) =>
		checked !== null
			? {
					root: {
						listStyleType: 'none',
						marginLeft: -20
					},
					checkbox: {
						marginLeft: 0,
						marginRight: 7,
						verticalAlign: 'middle'
					}
			  }
			: null,
	Break: {
		root: {
			height: 4,
			border: 'none',
			padding: 0,
			marginTop: 16,
			marginBottom: 16,
			background: theme.border
		}
	},
	Table: {
		root: {
			borderCollapse: 'collapse'
		}
	},
	TableRow: {},
	TableCell: ({ header, align }) => ({
		root: {
			border: `1px solid ${theme.border}`,
			padding: '5px 10px',
			fontWeight: header ? 'bold' : 'normal',
			textAlign: align
		}
	})
}

const styledComponents = {}
for (const [name, component] of Object.entries(baseComponents)) {
	styledComponents[name] = component.extendStyles(styles[name])
}

export default styledComponents
