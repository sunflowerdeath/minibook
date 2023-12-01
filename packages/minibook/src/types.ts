export interface Theme {
	kind: 'light' | 'dark'
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

export interface Story {
	name: string
	description: React.ReactNode
	src?: string
	props?: Object
	render?: (
		component: React.ComponentType | undefined,
		props: Object | undefined
	) => React.ReactNode
	component?: React.ComponentType
	markdown?: React.ComponentType
}

export interface Section {
	name: string
	component: React.ComponentType
	stories: { [key: string]: Story | Section }
}
