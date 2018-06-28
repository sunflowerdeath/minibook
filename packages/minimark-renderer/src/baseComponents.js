import React from 'react'
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
			disabled
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

const Table = ({ children, align, computedStyles }) => {
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
}

const TableRow = ({ children, header, align, computedStyles }) => (
	<tr style={computedStyles.root}>
		{React.Children.toArray(children).map((child, index) =>
			React.cloneElement(child, { header, align: align[index] })
		)}
	</tr>
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
