import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import floral from 'floral'

import Tappable from '../Tappable'

import { SectionPropType } from '../propTypes'

@floral
class SidebarSection extends Component {
	static styles = {
		title: {
			paddingTop: 5,
			paddingBottom: 5,
			paddingRight: 10,
			paddingLeft: 15,
			fontWeight: 'bold',
			cursor: 'pointer'
		},
		link: {
			display: 'block',
			textDecoration: 'none',
			paddingTop: 4,
			paddingBottom: 4,
			paddingLeft: 25,
			paddingRight: 10,
			fontSize: 14,
			color: '#888'
		},
		isHovered: {
			background: '#f2f2f2'
		},
		isActive: {
			color: 'black',
			fontWeight: 'bold'
		}
	}

	constructor(props) {
		super()

		this.state = {
			isOpened: props.initialIsOpened
		}
	}

	addHovered(style, tapState) {
		return {
			...style,
			...(tapState.isHovered && this.styles.isHovered)
		}
	}

	renderTitle() {
		const { section } = this.props
		return (
			<Tappable onTap={() => this.setState({ isOpened: !this.state.isOpened })}>
				{tapState => (
					<div style={this.addHovered(this.styles.title, tapState)}>
						{section.name}
					</div>
				)}
			</Tappable>
		)
	}

	renderLink(storyKey, story) {
		const { sectionKey } = this.props
		return (
			<Tappable key={storyKey}>
				{tapState => (
					<NavLink
						to={`/${sectionKey}/${storyKey}`}
						style={this.addHovered(this.styles.link, tapState)}
						activeStyle={this.styles.isActive}
					>
						{story.name}
					</NavLink>
				)}
			</Tappable>
		)
	}

	render() {
		const { isOpened } = this.state
		const { section, sectionKey } = this.props

		const links =
			isOpened &&
			Object.entries(section.stories).map(([storyKey, story]) =>
				this.renderLink(storyKey, story)
			)
		return (
			<div key={sectionKey} style={this.styles.root}>
				{this.renderTitle()}
				{links}
			</div>
		)
	}
}

SidebarSection.propTypes = {
	initialIsOpen: PropTypes.bool,
	section: SectionPropType.isRequired,
	sectionKey: PropTypes.string.isRequired
}

export default SidebarSection
