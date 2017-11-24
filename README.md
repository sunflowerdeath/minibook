# :orange_book: Minibook

Minibook is a minimalistic interface for documentation and examples of components.

![screenshot](screenshot.png)

## Install

```
npm install minibook minibook-loader
```

## Example

```js
import MiniBook from 'minibook'
import 'minibook/lib/styles.css'

import MarkdownStory from './markdown.md'

const sections = {
    section: {
        name: 'Section name',
        component: SomeComponent,
        stories: {
            'props-story': {
                name: 'Component',
                description: 'Story that displays React component with some props',
                props: { /* props for the component */ }
            },

            'render-story': {
                name: 'Render function',
                description: 'Custom render function for a story',
                props: { /* props for the component */ },
                render: (Component, props) => <Component {...props} />
            },

            'iframe-story': {
                name: 'Iframe',
                description: 'Page displayed in the iframe',
                src: '/page.html'
            },

            // Markdown with embedded components examples
            'markdown-story': MarkdownStory
        }
    }
}

ReactDOM.render(
    <MiniBook title="Minibook" sections={sections} />,
    document.querySelector('.container')
)
```

## Markdown Stories

`minibook-loader` compiles markdown to React JSX.
At the top of the file you can add YAML section with name and description attributes
of the story and list of imports used in examples.
Code blocks with `example` tag will output the rendered component followed by the source code.

````md
---
name: 'Markdown'
description: 'Description'
imports:
  'Button': './Button.js'
---

# Header

Example block:

```example
<Button onClick={() => alert('click')}>Button</Button>
```
````

## Setup

To be able to load markdown stories with webpack, you need to use `minibook-loader`
in combination with `babel-loader` for `*.md` files:

```js
{
    test: /\.md$/,
    use: [
        {
            loader: 'babel-loader',
            options: { /* options for babel-loader */ }
        },
        { loader: 'minibook-loader' }
    ]
}
```

You can view full config example at
[packages/example/webpack.config.js](https://github.com/sunflowerdeath/minibook/blob/master/packages/example/webpack.config.js)

## Props

### title
Type: `string`

### sections
Type: `array<Section>`

Section – object with the following properties:

- name `string` – Section name
- stories `object<Story>` – Stories of the section, an object where keys are
URLs of the stories and values are stories
- component `Component` – React component that will be displayed in stories

Story – object with the following properties:

- name `string` – Story name
- description `string` – Story description
- props `object` – Props for the section's component
- render `(Component, props) => node` – Custom render function
- src `string` – URL of the page to be displayed in the iframe

## License

This software is released into the public domain. See the LICENSE file.
