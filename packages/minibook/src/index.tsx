import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Helmet from 'react-helmet'

import ThemeContext from './ThemeContext'
import { dark, light } from './themes'
import MiniBook from './MiniBook'
import type { Theme } from './types'
import styles from 'raw-loader!./styles.css'

interface AppProps {
	basename: string
	theme?: Theme
}

const App = (props: AppProps) => {
	const { basename, theme, ...restProps } = props
	return (
		<>
			<Helmet>
				<style>{styles}</style>
			</Helmet>
			<ThemeContext.Provider value={theme}>
				<BrowserRouter basename={basename}>
					<Route
						path=":slash(/?):path(.+)"
						exact
						render={() => <MiniBook {...restProps} />}
					/>
				</BrowserRouter>
			</ThemeContext.Provider>
		</>
	)
}

App.defaultProps = {
	theme: light,
}

const themes = { dark, light }

export { App as Minibook, themes }
