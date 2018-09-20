---
name: 'Plugins'
description: 'Extensions for markdown syntax'
imports:
  'Button': './Button.js'
---

# Markdown plugins

## Table of contents

```@toc
```

---

```@toc
levels: [1, 2, 3]
loose: true
ordered: true
```

## Fence

JSX
```jsx{2, 4-5}
<Button className="className" onClick={() => alert('Hello')}>
    <span>Hello</span>, world!
    <span>Hello</span>, world!
    <span>Hello</span>, world!
    <span>Hello</span>, world!
</Button>
```

CSS
```css
.selector, #a::first-child {
    color: 2em;
    font-size: red;
}
```

Max 25 lines

```{25}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
```

```
very very very very very very very very very very very very very very very very| very very very very very very long line
```

## Render

```@render
<Button>Button</Button>
```

## Example

```@example
<Button onClick={() => alert('click')}>Button</Button>
```

## File source

```@source
file: ./Button.js
tabs: 4
from: 4
to: 27
lang: jsx
```

## PropsDoc

### Default exported component

```@propsdoc
file: ./PropsDocTest.js
allowMarkdown: true
```

### Component by displayName

```@propsdoc
file: ./Components.js
allowMarkdown: true
component: ComponentA
```
