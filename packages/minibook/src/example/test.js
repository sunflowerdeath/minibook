import React from 'react'
import ReactDOM from 'react-dom'

import Tappable from '../Tappable'

const SomeComponent = () => <div>Tap me</div>

class Test extends React.Component {
	render() {
		return (
			<Tappable
				onChangeTapState={tapState => console.log(tapState)}
				onTapStart={() => console.log('TAPSTART')}
				onTapEnd={() => console.log('TAPEND')}
				onTap={() => console.log('TAP')}
			>
				<a href='#'>123</a>
			</Tappable>
		)
		// <SomeComponent />

		/*
		 *
				{tapState => (
					<div style={{
						display: 'inline-block',
						padding: 15,
						background: '#ccc',
						userSelect: 'none',
						WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
						color: tapState.isPressed ? 'blue' : tapState.isHovered ? 'red' : 'black'
					}}>
						Tap me
					</div>
				)}
		*/
	}
}

ReactDOM.render(<Test />, document.querySelector('.container'))
