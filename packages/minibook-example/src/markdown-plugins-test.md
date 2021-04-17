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

### Syntax highlighting

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

```
very very very very very very very very very very very very very very very very| very very very very very very long line
```

### Render

```@render
<Button>Button</Button>
```

### Example

```@example
<Button onClick={() => alert('click')}>Button</Button>
```

### File source

```@source
file: ./Button.js
tabs: 4
from: 4
to: 27
lang: jsx
highlightLines: 4-5
maxLines: 15
```

## PropsDoc

### Default exported component

```@propsdoc
file: ./PropsDocTest.js
allowMarkdown: true
```

### Component by displayName

Exported component

```@propsdoc
file: ./Components.js
allowMarkdown: true
component: ComponentA
```

Functional component

```@propsdoc
file: ./Components.js
allowMarkdown: true
component: FunctionalComponent
```

### Typescript support

```@propsdoc
file: ./PropsDocTest.tsx
allowMarkdown: true
```
