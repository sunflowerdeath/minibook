import components from 'minimark-renderer/baseComponents'
import extendComponentStyles from 'minimark-renderer/extendComponentStyles'

const styledComponents = {
	Paragraph: extendComponentStyles(components.Paragraph, {
		root: {
			//
		}
	}),
	ListItem: extendComponentStyles(components.ListItem, {
		root: {
			//
		},
		checkbox: {
			//
		}
	})
}

export default styledComponents
