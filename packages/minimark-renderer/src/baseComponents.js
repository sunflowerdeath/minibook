import React, { useContext } from 'react'
import { useStyles } from 'floral'

import { MinimarkThemeContext } from './context'

const makeComponent = render => props => {
	const theme = useContext(MinimarkThemeContext)
	const computedStyles = useStyles({}, [props, theme])
	return render({ ...props, computedStyles })
}

const Root = makeComponent(({ children, computedStyles }) => (
	<div style={computedStyles.root}>{children}</div>
))

const Paragraph = makeComponent(({ children, computedStyles }) => (
	<p style={computedStyles.root}>{children}</p>
))

const Heading = makeComponent(({ children, level, computedStyles }) =>
	React.createElement(`h${level}`, { style: computedStyles.root }, children)
)

const Blockquote = makeComponent(({ children, computedStyles }) => (
	<blockquote style={computedStyles.root}>{children}</blockquote>
))

const Code = makeComponent(({ code, lang, computedStyles }) => (
	<pre data-lang={lang} style={computedStyles.root}>
		<code style={computedStyles.code}>{code}</code>
	</pre>
))

const List = makeComponent(({ children, ordered, computedStyles }) =>
	React.createElement(
		ordered ? 'ol' : 'ul',
		{ style: computedStyles.root },
		children
	)
)

const ListItem = makeComponent(({ children, checked, computedStyles }) => {
	const checkbox = checked !== null && (
		<input
			type="checkbox"
			defaultChecked={checked}
			style={computedStyles.checkbox}
			disabled
		/>
	)
	return (
		<li style={computedStyles.root}>
			{checkbox}
			{children}
		</li>
	)
})

ListItem.defaultProps = { checked: null }

const Break = makeComponent(({ computedStyles }) => (
	<hr style={computedStyles.root} />
))

const Table = makeComponent(({ children, align, computedStyles }) => {
	const [firstRow, ...restRows] = children
	return (
		<table style={computedStyles.root}>
			<thead>
				{React.cloneElement(firstRow, { header: true, align })}
			</thead>
			<tbody>
				{React.Children.map(restRows, row =>
					React.cloneElement(row, { align })
				)}
			</tbody>
		</table>
	)
})

const TableRow = makeComponent(
	({ children, header, align, computedStyles }) => (
		<tr style={computedStyles.root}>
			{React.Children.toArray(children).map((child, index) =>
				React.cloneElement(child, { header, align: align[index] })
			)}
		</tr>
	)
)

const TableCell = makeComponent(({ children, computedStyles }) => (
	<td style={computedStyles.root}>{children}</td>
))

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
	TableCell
}

export default components
