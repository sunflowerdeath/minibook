import React, { Component } from 'react'
import floral from 'floral'

// Some browsers round the line-height, others don't.
// We need to test for it to position the elements properly.
const isLineHeightRounded = (() => {
	const d = document.createElement('div')
	Object.assign(d.style, {
		fontSize: '13px',
		lineHeight: '1.5',
		padding: 0,
		border: 0
	})
	d.innerHTML = '&nbsp;<br />&nbsp;'
	document.body.appendChild(d)
	// Browsers that round the line-height should have offsetHeight === 38
	// The others should have 39.
	const res = d.offsetHeight === 38
	document.body.removeChild(d)
	return res
})()

const styles = {
	root: {
		marginBottom: '16px'
	},
	example: {
		padding: 10,
		border: '1px solid #e4e4e4'
	},
	pre: {
		marginTop: 0,
		marginBottom: 16,
		padding: 10,
		fontSize: '14px',
		background: '#f2f2f2',
		whiteSpace: 'pre',
		position: 'relative',
		overflow: 'auto',
		boxSizing: 'border-box'
	},
	highlightLine: {
		position: 'absolute',
		left: 0,
		right: 0,
		pointerEvents: 'none',
		background: 'rgba(232,213,32,0.2)'
	}
}

class Fence extends Component {
	constructor() {
		super()
		this.state = {}
		this.highlightLinesRefs = []
	}

	componentDidMount() {
		const { code, highlightLines, from, maxLines } = this.props
		if (!code) return

		const parseMethod = isLineHeightRounded ? parseInt : parseFloat
		const computedStyles = getComputedStyle(this.preRef)
		const lineHeight = parseMethod(computedStyles.lineHeight)
		const paddingTop = parseFloat(computedStyles.paddingTop)

		if (highlightLines) {
			this.highlightLinesRefs.forEach((ref, index) => {
				const { start, end } = highlightLines[index]
				ref.style.top = `${(start - from) * lineHeight +
					paddingTop}px`
				ref.style.height = `${(end - start + 1) * lineHeight}px`
			})
		}

		if (maxLines) {
			this.preRef.style.maxHeight = `${maxLines * lineHeight +
				paddingTop}px`
		}
	}

	renderHighlightLines() {
		const { highlightLines } = this.props
		const { computedStyles } = this.state
		return highlightLines.map((line, index) => (
			<div
				key={index}
				ref={ref => {
					this.highlightLinesRefs[index] = ref
				}}
				style={computedStyles.highlightLine}
			/>
		))
	}

	renderCode() {
		const { code, highlightLines } = this.props
		const { computedStyles } = this.state
		return (
			<pre
				style={computedStyles.pre}
				ref={ref => {
					this.preRef = ref
				}}
			>
				<code dangerouslySetInnerHTML={{ __html: code }} />
				{highlightLines && this.renderHighlightLines()}
			</pre>
		)
	}

	render() {
		const { children, code } = this.props
		const { computedStyles } = this.state
		return (
			<div style={computedStyles.root}>
				{children && (
					<div style={computedStyles.example}>{children}</div>
				)}
				{code && this.renderCode()}
			</div>
		)
	}
}

Fence.defaultProps = {
	from: 1,
	maxLines: 25
}

export default floral(styles)(Fence)
