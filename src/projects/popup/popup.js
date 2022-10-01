import * as ReactDOM from 'react-dom'

console.log('Hello world from popup!')

const ExtensionApp = () => {
  console.log('Hello World from popup.js inside the ExtensionApp!')

  return <p>Hi</p>
}

ReactDOM.render(
  <React.StrictMode>
    <ExtensionApp />
  </React.StrictMode>,
  document.getElementById('root')
)
