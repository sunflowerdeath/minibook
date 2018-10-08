import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import MiniBook from './MiniBook'

const App = ({ basename, ...restProps }) => (
	<BrowserRouter basename={basename}>
		<Route
			path="/:section?/:story?"
			exact
			render={() => <MiniBook {...restProps} />}
		/>
	</BrowserRouter>
)

export default App
