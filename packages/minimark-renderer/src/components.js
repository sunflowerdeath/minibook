import React, { Fragment } from 'react'

const Root = ({ children }) => <Fragment>{children}</Fragment>
const Paragraph = ({ children }) => <p>{children}</p>
const Heading = ({ children, depth }) =>
	React.createElement(`h${depth}`, null, children)
const Blockquote = ({ children }) => <blockquote>{children}</blockquote>
const List = ({ children, ordered }) =>
	React.createElement(ordered ? 'ol' : 'ul', children)
const ListItem = ({ children }) => <li>{children}</li>
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
	List,
	ListItem,
	Break,
	Table,
	TableRow,
	TableCell
}

export default components
