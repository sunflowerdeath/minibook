import {
	useContext,
	createElement,
	Children,
	cloneElement,
	forwardRef,
} from 'react'

import { useTheme, MinimarkTheme } from './context'
import { useStyles, StyleProps, StyleMap } from './styles'
import { Fence } from './plugins/fence'
import { TableOfContents, AnchorHeading } from './plugins/tableOfContents'
import { PropsDoc } from './plugins/propsdoc'

interface BaseProps extends StyleProps<[BaseProps, MinimarkTheme]> {
	children: React.ReactNode
}

const rootStyles = {
	root: {
		lineHeight: '1.5',
	},
}

const paragraphStyles = {
	root: {
		marginTop: 0,
		marginBottom: '1rem',
	},
}

const headingFontSizes = {
	1: '2rem',
	2: '1.5rem',
	3: '1.25rem',
	4: '1rem',
	5: '1rem',
}

const headingStyles = (
	{ level, first }: HeadingProps,
	theme: MinimarkTheme
) => ({
	root: {
		fontSize: headingFontSizes[level],
		marginBottom: '1rem',
		marginTop: first ? 0 : '1.5rem',
		fontWeight: 'bold',
		lineHeight: '1.25',
		...(level === 1 && {
			paddingBottom: '.5rem',
			borderBottom: `1px solid ${theme.border}`,
		}),
	},
})

const blockquoteStyles = (props: {}, theme: MinimarkTheme) => ({
	root: {
		paddingLeft: '1rem',
		color: theme.secondary,
		borderLeft: `4px solid ${theme.border}`,
		marginLeft: 0,
	},
})

const codeStyles = (props: {}, theme: MinimarkTheme) => ({
	root: {
		marginTop: 0,
		marginBottom: '1rem',
		padding: '.625rem',
		fontSize: '.925rem',
		background: theme.background,
		whiteSpace: 'pre-wrap',
	},
})

const listStyles = {
	root: {
		paddingLeft: '1rem',
		marginTop: 0,
		marginBottom: '1rem',
	},
}

const listItemStyles = (props: {}, { checked }: ListItemProps) =>
	checked !== null
		? {
				root: {
					marginLeft: 0,
				},
				checkbox: {
					marginLeft: 0,
					marginRight: 7,
					verticalAlign: 'middle',
				},
		  }
		: {}

const breakStyles = (props: {}, theme: MinimarkTheme) => ({
	root: {
		height: 4,
		border: 'none',
		padding: 0,
		marginTop: '1rem',
		marginBottom: '1rem',
		background: theme.border,
	},
})

const tableStyles: StyleMap = {
	root: {
		borderCollapse: 'collapse',
	},
}

const tableCellStyles = (
	{ isHeader, align }: TableCellProps,
	theme: MinimarkTheme
): StyleMap => ({
	root: {
		border: `1px solid ${theme.border}`,
		padding: '5px 10px',
		fontWeight: isHeader ? 'bold' : 'normal',
		textAlign: align as any,
	},
})

const Root = (props: BaseProps) => {
	const { children } = props
	const theme = useTheme()
	const styles = useStyles(rootStyles, [props, theme])
	return <div style={styles.root}>{children}</div>
}

const Paragraph = (props: BaseProps) => {
	const { children } = props
	const theme = useTheme()
	const styles = useStyles(paragraphStyles, [props, theme])
	return <p style={styles.root}>{children}</p>
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5

interface HeadingProps extends StyleProps<[HeadingProps, MinimarkTheme]> {
	level: HeadingLevel
	first: boolean
	children: React.ReactNode
}

const Heading = forwardRef((props: HeadingProps, ref) => {
	const { children, level, ...rest } = props
	const theme = useTheme()
	const styles = useStyles(headingStyles, [props, theme])
	return createElement(`h${level}`, { children, ...rest, ref })
})

const Blockquote = (props: BaseProps) => {
	const { children } = props
	const theme = useTheme()
	const styles = useStyles(blockquoteStyles, [props, theme])
	return <blockquote style={styles.root}>{children}</blockquote>
}

interface CodeProps extends StyleProps<[CodeProps, MinimarkTheme]> {
	lang: string
	code: React.ReactNode
}

const Code = (props: CodeProps) => {
	const { code, lang } = props
	const theme = useTheme()
	const styles = useStyles(codeStyles, [props, theme])
	return (
		<pre data-lang={lang} style={styles.root}>
			<code style={styles.code}>{code}</code>
		</pre>
	)
}

interface ListProps extends StyleProps<[ListProps, MinimarkTheme]> {
	ordered: boolean
	children: React.ReactNode
}

const List = (props: ListProps) => {
	const { children, ordered } = props
	const theme = useTheme()
	const styles = useStyles(listStyles, [props, theme])
	const elem = ordered ? 'ol' : 'ul'
	return createElement(elem, { style: styles.root }, children)
}

interface ListItemProps extends StyleProps<[ListItemProps, MinimarkTheme]> {
	checked: null | boolean
	children: React.ReactNode
}

const ListItem = (props: ListItemProps) => {
	const { children, checked } = props
	const theme = useTheme()
	const styles = useStyles(listItemStyles, [props, theme])
	const checkbox = checked !== null && (
		<input
			type="checkbox"
			defaultChecked={checked}
			style={styles.checkbox}
			disabled
		/>
	)
	return (
		<li style={styles.root}>
			{checkbox}
			{children}
		</li>
	)
}

const Break = (props: BaseProps) => {
	const theme = useTheme()
	const styles = useStyles(breakStyles, [props, theme])
	return <hr style={styles.root} />
}

interface TableProps extends StyleProps<[TableProps, MinimarkTheme]> {
	children: React.ReactNodeArray
	align: string
}

interface TableRowProps extends StyleProps<[TableRowProps, MinimarkTheme]> {
	children: React.ReactNode
	isHeader: boolean
	align: string
}

interface TableCellProps extends StyleProps<[TableCellProps, MinimarkTheme]> {
	children: React.ReactNode
	isHeader: boolean
	align: string
}

const Table = (props: TableProps) => {
	const { children, align } = props
	const [firstRow, ...restRows] = children
	const theme = useTheme()
	const styles = useStyles(tableStyles, [props, theme])
	return (
		<table style={styles.root}>
			{firstRow && (
				<thead>
					{cloneElement(firstRow, { isHeader: true, align })}
				</thead>
			)}
			<tbody>
				{Children.map(restRows, (row) => cloneElement(row, { align }))}
			</tbody>
		</table>
	)
}

const TableRow = (props: TableRowProps) => {
	const { children, isHeader, align } = props
	const theme = useTheme()
	const styles = useStyles({}, [props, theme])
	return (
		<tr style={styles.root}>
			{Children.toArray(children).map((child, index) =>
				cloneElement(child, { isHeader, align: align[index] })
			)}
		</tr>
	)
}

const TableCell = (props: TableRowProps) => {
	const { children } = props
	const theme = useTheme()
	const styles = useStyles(tableCellStyles, [props, theme])
	return <td style={styles.root}>{children}</td>
}

const components = {
	Root,
	Paragraph,
	Heading,
	Blockquote,
	Code,
	List,
	ListItem,
	Break,
	Table,
	TableRow,
	TableCell,
	Fence,
	TableOfContents,
	AnchorHeading,
    PropsDoc
}

export default components
