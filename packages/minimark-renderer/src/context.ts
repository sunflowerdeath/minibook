import { createContext, useContext } from 'react'

export interface MinimarkTheme {
	type: 'light' | 'dark'
	background: string
	text: string
	secondary: string
	border: string
	highlight: string
	link: string
	codePrimary: string
	codeSecondary: string
	codeOther: string
}

export interface MinimarkContextProps {
	components: { [key: string]: React.ComponentType<any> }
	theme: MinimarkTheme 
}

const MinimarkContext = createContext<MinimarkContextProps>({
	components: {},
	theme: { type: 'light' } as MinimarkTheme,
})

const useTheme = () => useContext(MinimarkContext).theme

export default MinimarkContext
export { useTheme }
