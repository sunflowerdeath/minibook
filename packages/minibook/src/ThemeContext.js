import { createContext, useContext } from 'react'

const dark = {
	background: '#1a1a1a',
	text: '#fff',
	secondary: '#666',
	border: '#383838',
	highlight: '#333',
	blue: '#2196f3'
}

const light = {
	background: '#fff',
	text: '#000',
	secondary: '#999',
	border: '#e4e4e4',
	highlight: '#f2f2f2',
	blue: '#0366d6'
}

const themes = { dark, light }

const ThemeContext = createContext(light)

const useTheme = () => useContext(ThemeContext)

export { themes, ThemeContext, useTheme }
