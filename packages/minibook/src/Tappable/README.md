
## API

### children

```
// 1. DOM element
<Tappable {...props}>
	<div>Tap me</div>
</Tappable>

// 2. Component
const SomeComponent = () => <div>Tap me</div>

<Tappable {...props}>
	<SomeComponent />
</Tappable>

// 3. Link
<Tappable {...props}>
	<a href="https://google.com">Tap me</a>
</Tappable>

// 4. Any of above inside a function
<Tappable>
	{tapState => <div style={{ color: tapState.hovered ? 'red' : 'black' }}>Tap me</div>}
</Tappable>
```

### onChangeTapState

### onTap

### onTapStart

### onTapEnd

### disabled

### style
