import { createContext, useContext } from 'react'

import { light } from './themes'

const ThemeContext = createContext(light)

const useTheme = () => useContext(ThemeContext)

export default ThemeContext
export { useTheme }
