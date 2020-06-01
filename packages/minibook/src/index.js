import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route } from 'react-router-dom'

import { ThemeContext, themes } from './ThemeContext'
import MiniBook from './MiniBook'

const App = ({ basename, theme, ...restProps }) => (
    <ThemeContext.Provider value={themes[theme]}>
        <BrowserRouter basename={basename}>
            <Route
                path="/:section?/:story?"
                exact
                render={() => <MiniBook {...restProps} />}
            />
        </BrowserRouter>
    </ThemeContext.Provider>
)

App.propTypes = {
    basename: PropTypes.string,
    theme: PropTypes.oneOf(['light', 'dark'])
}

App.defaultProps = {
    theme: 'dark'
}

export default App
