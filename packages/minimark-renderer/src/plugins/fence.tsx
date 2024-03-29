import React, { useRef, useEffect } from 'react'
import { useStyles } from 'floral'

import { useTheme } from '../context'

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
	// Others should have 39.
	const res = d.offsetHeight === 38
	document.body.removeChild(d)
	return res
})()

const styles = (props, theme) => ({
	root: {
		marginBottom: '1rem'
	},
	example: {
		padding: 10,
		border: `1px solid ${theme.border}`
	},
	pre: {
		marginTop: 0,
		marginBottom: "1rem",
		padding: 10,
		fontSize: '14px',
		background: theme.highlight,
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
})

const Fence = props => {
	const { children, code, highlightLines, from, maxLines } = props
	const theme = useTheme()
	const computedStyles = useStyles(styles, [props, theme])
	const codeRef = useRef()
	const highlightLinesRefs =
		highlightLines && highlightLines.map(() => useRef())

	useEffect(() => {
	    if (!code) return
		const elemStyles = getComputedStyle(codeRef.current)
		const parseMethod = isLineHeightRounded ? parseInt : parseFloat
		const lineHeight = parseMethod(elemStyles.lineHeight)
		const paddingTop = parseFloat(elemStyles.paddingTop)
		if (highlightLines) {
			highlightLinesRefs.forEach((ref, index) => {
				const { start, end } = highlightLines[index]
				ref.current.style.top = `${(start - from) * lineHeight +
					paddingTop}px`
				ref.current.style.height = `${(end - start + 1) * lineHeight}px`
			})
		}

		if (maxLines) {
			codeRef.current.style.maxHeight = `${maxLines * lineHeight +
				paddingTop}px`
		}
	}, [])

	let codeElem
	if (code) {
		let highlightLinesElems
		if (highlightLines) {
			highlightLinesElems = highlightLines.map((line, index) => (
				<div
					key={index}
					ref={highlightLinesRefs[index]}
					style={computedStyles.highlightLine}
				/>
			))
		}
		codeElem = (
			<pre style={computedStyles.pre} ref={codeRef}>
				<code dangerouslySetInnerHTML={{ __html: code }} />
				{highlightLinesElems}
			</pre>
		)
	}

	return (
		<div style={computedStyles.root}>
			{children && <div style={computedStyles.example}>{children}</div>}
			{codeElem}
		</div>
	)
}

Fence.defaultProps = {
	from: 1
}

export { Fence }
