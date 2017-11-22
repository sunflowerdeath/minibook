const bindComponentMethods = (...methods) => Component => {
	class BoundComponent extends Component {
		static displayName = Component.displayName || Component.name

		constructor(props, context) {
			super(props, context)
			methods.forEach(name => {
				if (this[name]) this[name] = this[name].bind(this)
			})
		}
	}
	return BoundComponent
}

export default bindComponentMethods
