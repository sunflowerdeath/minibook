# Header <span style="color: red">html</span> *italic*

## Plugins

```!toc
levels: 1,2,3
```

### Source fence

```@source
file: ./index.js
from: 8
to: 18
tabs: 4
```

### Example

```@example
<div>1</div>
```

### Render

```@render
<div>1</div>
```

## Blocks

Paragraph <b>html</b> *italic*

> Blockquote <b>html</b> *italic*

Html block:

<div style="background: #ccc">
	<b>Bold</b>
</div>

Horizontal line:

---

## List

- Unordered
- List

1. Ordered
2. List

- [ ] List
- [x] With
- [ ] Checkboxes

### Nested list

- List
- With
  - Second
  - Level

### Loose list

- Loose lists

- Can contain multiple
  
  block elements

- 123
  <br>
  456

- 789

## Links

Link: [Google](http://google.com "Title")

Reference link: [Reference link][link]

Empty reference link: [link]

## Images

Inline image: 
![alt text](http://via.placeholder.com/100x100 "Title")

Reference image: 
![alt text][image]

## Code

Code block:

```js
<div>1</div>
`qwe`
'asd'
"zxc"
```

Inline code: `code`

## Tables

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| `code`        | *i* <b>b</b>  |    $1 |
 
[image]: http://via.placeholder.com/100x100 "Title"
[link]: http://www.reddit.com
