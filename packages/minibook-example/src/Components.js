import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ComponentA extends Component {
	static propTypes = {
		someProp: PropTypes.string.isRequried
	}

	render() {
		return null
	}
}

class ComponentB extends Component {
	static propTypes = {
		someProp: PropTypes.number.isRequried
	}

	render() {
		return null
	}
}

class NotExportedComponent extends Component {
	static propTypes = {
		someProp: PropTypes.number.isRequried
	}

	render() {
		return null
	}
}

export { ComponentA, ComponentB }
