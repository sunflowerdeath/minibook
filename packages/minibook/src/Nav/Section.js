import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import floral from 'floral'

import Tappable from '../Tappable'
import { SectionPropType } from '../propTypes'
import arrowIconSvg from '!raw-loader!./arrow.svg' // eslint-disable-line import/first

@floral
class NavSection extends Component {
	static propTypes = {
		initialIsOpened: PropTypes.bool,
		section: SectionPropType.isRequired,
		sectionKey: PropTypes.string.isRequired
	}

	static styles = ({ smallScreen }, { isOpened }) => ({
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
			WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
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
			WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
		},
		isHovered: {
			background: '#f2f2f2'
		},
		isActive: {
			color: '#0366d6'
		}
	})

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
						<div
							style={this.styles.arrow}
							dangerouslySetInnerHTML={{ __html: arrowIconSvg }}
						/>
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

export default NavSection
