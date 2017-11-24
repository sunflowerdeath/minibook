import PropTypes from 'prop-types'

const StoryPropType = PropTypes.shape({
	name: PropTypes.string.isRequired,
	description: PropTypes.node,
	props: PropTypes.object,
	render: PropTypes.func,
	src: PropTypes.string
})

const SectionPropType = PropTypes.shape({
	name: PropTypes.string.isRequired,
	component: PropTypes.func,
	stories: PropTypes.objectOf(StoryPropType)
})

export { StoryPropType, SectionPropType }
