import React, { Fragment } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import ScrollMemory from 'react-router-scroll-memory'

import MiniBook from './MiniBook'

const App = ({ basename, ...restProps }) => (
	<BrowserRouter basename={basename}>
		<Fragment>
			<ScrollMemory />
			<Route
				path="/:section?/:story?"
				exact
				render={() => <MiniBook {...restProps} />}
			/>
		</Fragment>
	</BrowserRouter>
)

export default App
