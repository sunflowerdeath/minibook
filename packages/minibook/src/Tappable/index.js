import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import bindComponentMethods from './bindComponentMethods'
import cloneElementWithHandlers from './cloneElementWithHandlers'

let ignoreMouseEvents

/** Helper for handling touch and mouse events for button-like components. */
@bindComponentMethods(
	'onMouseEnter',
	'onMouseLeave',
	'onMouseDown',
	'onMouseUp',
	'onTouchStart',
	'onTouchMove',
	'onTouchEnd',
	'onClick'
)
class Tappable extends Component {
	static propTypes = {
		/**
		 * Single element.
		 * When not DOM-component is provided, it is wrapped with `div`.
		 */
		children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,

		/** Tap event handler. */
		onTap: PropTypes.func,

		/** Disables events handling. */
		disabled: PropTypes.bool,

		/**
		 * Handler of hovered and pressed states changes.
		 *
		 * `({hovered: boolean, pressed: boolean}) => void`
		 */
		onChangeTapState: PropTypes.func,

		/**
		 * `(tap: object) => void`
		 */
		onTapStart: PropTypes.func,

		/**
		 * `(tap: object) => void`
		 */
		onTapEnd: PropTypes.func,

		/** CSS `display` property of the wrapper element, that is created when
		 * child is not DOM-component. */
		display: PropTypes.string,

		/** Style passed down to the child element. */
		style: PropTypes.object
	}

	static defaultProps = {
		display: 'inline-block'
	}

	constructor(props) {
		super(props)

		this.isTouched = false
		this.state = {
			tapState: {
				isPressed: false,
				isHovered: false
			}
		}
	}

	componentWillUnmount() {
		this.unmounted = false
	}

	onMouseEnter() {
		if (ignoreMouseEvents) return
		this.setTapState({ isHovered: true })
	}

	onMouseLeave() {
		if (ignoreMouseEvents) return
		this.setTapState({ isHovered: false })
	}

	onMouseDown(event) {
		if (ignoreMouseEvents) {
			ignoreMouseEvents = false
			return
		}
		if (event.button !== 0) return
		document.addEventListener('mouseup', this.onMouseUp)
		this.setTapState({ isPressed: true })
		if (this.props.onTapStart) this.props.onTapStart(event)
	}

	onMouseUp(event) {
		document.removeEventListener('mouseup', this.onMouseUp)
		if (this.unmounted) return
		const isOnButton = event.target === ReactDOM.findDOMNode(this)
		// $(event.target).closest(ReactDOM.findDOMNode(this)).length
		this.setTapState({ isPressed: false, isHovered: isOnButton })
		if (this.props.onTapEnd) this.props.onTapEnd(event)
	}

	onTouchStart(event) {
		ignoreMouseEvents = true
		if (event.touches.length === 1) {
			this.isTouched = true
			this.initScrollDetection()
			this.setTapState({ isHovered: true, isPressed: true })
			if (this.props.onTapStart) this.props.onTapStart(event.touches[0])
		}
	}

	onTouchMove() {
		if (!this.isTouched) return
		if (this.detectScroll()) this.endTouch()
	}

	onTouchEnd(event) {
		if (!this.isTouched) return
		this.endTouch(event) // TODO check multiple touches
	}

	onClick(event) {
		if (this.props.onTap) this.props.onTap(event)
	}

	setTapState(tapState) {
		const nextTapState = { ...this.state.tapState, ...tapState }
		this.setState({ tapState: nextTapState })
		if (this.props.onChangeTapState) this.props.onChangeTapState(nextTapState)
	}

	endTouch(event) {
		this.isTouched = false
		this.setTapState({ isHovered: false, isPressed: false })
		if (this.props.onTapEnd) this.props.onTapEnd(event)
	}

	initScrollDetection() {
		this.scrollPos = { top: 0, left: 0 }
		this.scrollParents = []
		let node = ReactDOM.findDOMNode(this)
		while (node) {
			if (
				node.scrollHeight > node.offsetHeight ||
				node.scrollWidth > node.offsetWidth
			) {
				this.scrollParents.push(node)
				this.scrollPos.top += node.scrollTop
				this.scrollPos.left += node.scrollLeft
			}
			node = node.parentNode
		}
	}

	detectScroll() {
		const currentScrollPos = { top: 0, left: 0 }
		this.scrollParents.forEach(elem => {
			currentScrollPos.top += elem.scrollTop
			currentScrollPos.left += elem.scrollLeft
		})
		return (
			currentScrollPos.top !== this.scrollPos.top ||
			currentScrollPos.left !== this.scrollPos.left
		)
	}

	renderElem(elem) {
		const { style, disabled, display } = this.props
		let elemWithProps = React.cloneElement(elem, {
			style: { ...elem.props.style, ...style }
		})
		if (!disabled) {
			if (typeof elem.type !== 'string') {
				elemWithProps = <div style={{ display }}>{elem}</div>
			}
			elemWithProps = cloneElementWithHandlers(elem, {
				onMouseEnter: this.onMouseEnter,
				onMouseLeave: this.onMouseLeave,
				onMouseDown: this.onMouseDown,
				onTouchStart: this.onTouchStart,
				onTouchMove: this.onTouchMove,
				onTouchEnd: this.onTouchEnd,
				onClick: this.onClick
			})
		}
		return elemWithProps
	}

	render() {
		const { children } = this.props
		const { tapState } = this.state
		const elem = typeof children === 'function' ? children(tapState) : children
		return this.renderElem(elem)
	}
}

export default Tappable
