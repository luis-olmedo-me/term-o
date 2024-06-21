import React from 'react'
import ReactDOM from 'react-dom'

console.log('Hello world from sidepanel!')

const ExtensionApp = () => {
  console.log('Hello World from sidepanel.js inside the ExtensionApp!')

  return <p>Hi</p>
}

ReactDOM.render(
  <React.StrictMode>
    <ExtensionApp />
  </React.StrictMode>,
  document.getElementById('root')
)
