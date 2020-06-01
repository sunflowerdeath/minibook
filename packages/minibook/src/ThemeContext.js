import { createContext, useContext } from 'react'

const ThemeContext = createContext('light')

const useTheme = () => useContext(ThemeContext)

export { ThemeContext, useTheme }
