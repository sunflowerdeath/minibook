import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import MiniBook from './MiniBook'

class App extends Component {
	render() {
		const render = () => <MiniBook {...this.props} />
		return (
			<BrowserRouter>
				<Route path="/:section?/:story?" exact render={render} />
			</BrowserRouter>
		)
	}
}

export default App
