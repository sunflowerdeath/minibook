# Minibook

Minibook is a minimal interface to show documentation and examples for
React components.

## Features

## Example

```js
import MiniBook from '@fxf/minibook'

const sections = {
  'section-url': {
    name: 'Section name',
    description: 'Section description',
    component: YourComponent,
    stories: {
      props: {
        name: 'First story',
        description: 'Story description',
        props: {
          // some props for YourComponent
        }
      },
      render: {
        name: 'Render function',
        description: 'You can use custom render function for your stories',
        render: (props, Component) => (
          <Component
            {...props}
            onClick={() => console.log('click')}
          />
        )
      },
      iframe: {
        name: 'Iframe story',
        description: 'Story can be another page displayed in the iframe',
        src: '/some/page.html'
      },
      markdown: {
        name: 'Markdown story',
        description: 'You can write stories in markdown',
        markdown: `
          ## Some markdown

          **Hello!**
        `
      }
    }
  }
}

ReactDOM.render(<MiniBook sections={sections} />, elem)
```
