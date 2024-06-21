import * as React from 'preact'

console.log('Hello world from sidepanel!')

const ExtensionApp = () => {
  console.log('Hello World from sidepanel.js inside the ExtensionApp!')

  return <p>Hi</p>
}

React.render(<ExtensionApp />, document.getElementById('root'))
