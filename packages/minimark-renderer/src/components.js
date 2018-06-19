import React, { Fragment } from 'react'

const Root = ({ children }) => <Fragment>{children}</Fragment>
const Paragraph = ({ children }) => <p>{children}</p>
const Heading = ({ children, depth }) =>
	React.createElement(`h${depth}`, null, children)
const Blockquote = ({ children }) => <blockquote>{children}</blockquote>
const Code = ({ code, lang }) => (
	<pre data-lang={lang}>
		<code>{code}</code>
	</pre>
)
const List = ({ children, ordered }) =>
	React.createElement(ordered ? 'ol' : 'ul', null, children)

const ListItem = ({ children, checked }) => {
	const checkbox = checked !== null && (
		<input type="checkbox" defaultChecked={checked} />
	)
	return (
		<li>
			{checkbox}
			{children}
		</li>
	)
}

const Break = () => <hr />

const Table = ({ children }) => (
	<table>
		<tbody>{children}</tbody>
	</table>
)
const TableRow = ({ children }) => <tr>{children}</tr>
const TableCell = ({ children }) => <td>{children}</td>

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
