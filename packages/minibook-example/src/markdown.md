---
name: 'Markdown'
description: 'Story can be written in markdown'
imports:
  'Button': './Button.js'
---

PropsDoc

```@propsdoc
file: ./PropsDocTest.js
allowMarkdown: true
```

Table of contents

```@toc
```

## Header

Inline code `<div>1</div>'asd'`

Code block:
```
<div>1</div>
`qwe`
'asd'
"zxc"
```

## JSX

```@render
<Button>Button</Button>
```

## Examples

Default state

```@example
<Button onClick={() => alert('click')}>Button</Button>
```

Primary button

```@example
<Button primary>Primary</Button>
```

Disabled button

```@example
<Button disabled>Disabled</Button>
```

## File source

```@source
file: ./Button.js
tabs: 4
from: 4
to: 27
```

## Anchors

[External link](http://google.com)

[Relative link](/example/props)

[Anchor link](#examples)

