import React, { Fragment } from 'react'
import floral from 'floral'

const Root = ({ children, computedStyles }) => (
	<div style={computedStyles.root}>{children}</div>
)

const Paragraph = ({ children, computedStyles }) => (
	<p style={computedStyles.root}>{children}</p>
)

const Heading = ({ children, level, computedStyles }) =>
	React.createElement(`h${level}`, { style: computedStyles.root }, children)

const Blockquote = ({ children, computedStyles }) => (
	<blockquote style={computedStyles.root}>{children}</blockquote>
)

const Code = ({ code, lang, computedStyles }) => (
	<pre data-lang={lang} style={computedStyles.root}>
		<code style={computedStyles.code}>{code}</code>
	</pre>
)

const List = ({ children, ordered, computedStyles }) =>
	React.createElement(
		ordered ? 'ol' : 'ul',
		{ style: computedStyles.root },
		children
	)

const ListItem = ({ children, checked, computedStyles }) => {
	const checkbox = checked !== null && (
		<input
			type="checkbox"
			defaultChecked={checked}
			style={computedStyles.checkbox}
		/>
	)
	return (
		<li style={computedStyles.root}>
			{checkbox}
			{children}
		</li>
	)
}

ListItem.defaultProps = { checked: null }

const Break = ({ computedStyles }) => <hr style={computedStyles.root} />

const Table = ({ children, computedStyles }) => (
	<table style={computedStyles.root}>
		<tbody>{children}</tbody>
	</table>
)

const TableRow = ({ children, computedStyles }) => (
	<tr style={computedStyles.root}>{children}</tr>
)

const TableCell = ({ children, computedStyles }) => (
	<td style={computedStyles.root}>{children}</td>
)

const components = {
	Root: floral()(Root),
	Paragraph: floral()(Paragraph),
	Heading: floral()(Heading),
	Blockquote: floral()(Blockquote),
	Code: floral()(Code),
	List: floral()(List),
	ListItem: floral()(ListItem),
	Break: floral()(Break),
	Table: floral()(Table),
	TableRow: floral()(TableRow),
	TableCell: floral()(TableCell)
}

export default components
