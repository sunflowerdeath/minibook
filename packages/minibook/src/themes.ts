import type { Theme } from "./types"

const dark: Theme = {
	kind: 'dark',
	background: '#1a1a1a',
	text: '#fff',
	secondary: '#666',
	border: '#383838',
	highlight: '#333',
	link: '#2196f3',
	codePrimary: '#2196f3',
	codeSecondary: '#f14992',
	codeOther: '#714db3',
}

const light: Theme = {
	kind: 'light',
	background: '#fff',
	text: '#000',
	secondary: '#999',
	border: '#e4e4e4',
	highlight: '#f2f2f2',
	link: '#0366d6',
	codePrimary: '#0366d6',
	codeSecondary: '#e3116c',
	codeOther: '#673ab7',
}

export { dark, light }
