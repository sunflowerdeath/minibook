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
```

## PropsDoc

```@propsdoc
file: ./PropsDocTest.js
allowMarkdown: true
```
