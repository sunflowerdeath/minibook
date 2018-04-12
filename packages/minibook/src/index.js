import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import MiniBook from './MiniBook'

const App = props => (
	<BrowserRouter>
		<Route
			path="/:section?/:story?"
			exact
			render={() => <MiniBook {...props} />}
		/>
	</BrowserRouter>
)

export default App
