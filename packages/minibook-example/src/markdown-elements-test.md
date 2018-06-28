---
imports:
  'Button': './Button.js'
---

# Markdown elements

## Header <span style="color: red">inline html</span> *italic*

Paragraph <span style="color: red">inline html</span> *italic*

> Blockquote <span style="color: red">inline html</span> *italic*

Horizontal line:

---

Html block:

<div style="background: #666; padding: 10px; color: white">
	<b>Bold</b>
</div>

## Lists

- Unordered
- List

1. Ordered
2. List

- [ ] List
- [x] With
- [ ] Checkboxes
- 123

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

Link: [example/props](/example/props)

External link: [Google](http://google.com "Title")

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

Inline code: `code<div>1</div>"qwe"'asd'`

## Tables

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| `code`        | *i* <b>b</b>  |    $1 |

[image]: http://via.placeholder.com/100x100 "Title"
[link]: http://www.reddit.com
