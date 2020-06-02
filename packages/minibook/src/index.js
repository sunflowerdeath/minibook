import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route } from 'react-router-dom'
import Helmet from 'react-helmet'

import ThemeContext from './ThemeContext'
import { light } from './themes'
import MiniBook from './MiniBook'

const jsToCssVars = obj =>
	Object.entries(obj)
		.map(([key, value]) => `--minibook-theme-${key}: ${value};`)
		.join('\n')

const App = ({ basename, theme, ...restProps }) => (
	<>
		<Helmet>
			<style>{`:root { ${jsToCssVars(theme)} }`}</style>
		</Helmet>
		<ThemeContext.Provider value={theme}>
			<BrowserRouter basename={basename}>
				<Route
					path="/:section?/:story?"
					exact
					render={() => <MiniBook {...restProps} />}
				/>
			</BrowserRouter>
		</ThemeContext.Provider>
	</>
)

App.propTypes = {
	basename: PropTypes.string,
	theme: PropTypes.object
}

App.defaultProps = {
	theme: light
}

export default App
