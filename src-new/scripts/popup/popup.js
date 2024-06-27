import * as React from 'preact'

console.log('Hello world from popup!')

const ExtensionApp = () => {
  console.log('Hello World from popup.js inside the ExtensionApp!')

  return <p>Hi</p>
}

React.render(<ExtensionApp />, document.getElementById('root'))
