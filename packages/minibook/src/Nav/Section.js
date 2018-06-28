import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import Taply from 'taply'
import floral from 'floral'

import { SectionPropType } from '../propTypes'
// eslint-disable-next-line import/first
import arrowIconSvg from '!raw-loader!./arrow.svg'

const styles = ({ smallScreen }, { isOpened }) => ({
	title: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 10,
		paddingLeft: 15,
		fontWeight: 'bold',
		cursor: 'pointer',
		textTransform: 'uppercase',
		userSelect: 'none',
		WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
		outline: 'none'
	},
	arrow: {
		width: 24,
		height: 24,
		transform: isOpened ? 'rotate(180deg)' : 'none'
	},
	link: {
		display: 'block',
		textDecoration: 'none',
		paddingTop: smallScreen ? 8 : 4,
		paddingBottom: smallScreen ? 8 : 4,
		paddingLeft: 15,
		paddingRight: 10,
		fontSize: 14,
		color: '#999',
		userSelect: 'none',
		WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
		outline: 'none'
	},
	isHovered: {
		background: '#f2f2f2'
	},
	isActive: {
		color: '#0366d6'
	}
})

@floral(styles)
class NavSection extends Component {
	static propTypes = {
		initialIsOpened: PropTypes.bool,
		section: SectionPropType.isRequired,
		sectionKey: PropTypes.string.isRequired
	}

	constructor(props) {
		super()

		this.state = {
			isOpened: props.initialIsOpened
		}
	}

	addHovered(style, { isHovered, isFocused }) {
		const { computedStyles } = this.state
		return isHovered || isFocused
			? { ...style, ...computedStyles.isHovered }
			: style
	}

	renderTitle() {
		const { computedStyles } = this.state
		const { section } = this.props
		return (
			<Taply
				onTap={() => this.setState({ isOpened: !this.state.isOpened })}
			>
				{tapState => (
					<div
						style={this.addHovered(computedStyles.title, tapState)}
					>
						{section.name}
						<div
							style={computedStyles.arrow}
							dangerouslySetInnerHTML={{ __html: arrowIconSvg }}
						/>
					</div>
				)}
			</Taply>
		)
	}

	renderLink(storyKey, story) {
		const { computedStyles } = this.state
		const { sectionKey } = this.props
		return (
			<Taply key={storyKey}>
				{tapState => (
					<NavLink
						to={`/${sectionKey}/${storyKey}`}
						style={this.addHovered(computedStyles.link, tapState)}
						activeStyle={computedStyles.isActive}
					>
						{story.name}
					</NavLink>
				)}
			</Taply>
		)
	}

	render() {
		const { isOpened } = this.state
		const { section, sectionKey } = this.props
		const { computedStyles } = this.state

		const links =
			isOpened &&
			Object.entries(section.stories).map(([storyKey, story]) =>
				this.renderLink(storyKey, story)
			)
		return (
			<div key={sectionKey} style={computedStyles.root}>
				{this.renderTitle()}
				{links}
			</div>
		)
	}
}

export default NavSection
