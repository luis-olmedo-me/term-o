import { createRoot } from 'react-dom/client'

console.log('Hello world from popup!')

const ExtensionApp = () => {
  console.log('Hello World from popup.js inside the ExtensionApp!')

  return <p>Hi</p>
}

const root = createRoot(appRoot)

root.render(
  <React.StrictMode>
    <ExtensionApp />
  </React.StrictMode>,
  document.getElementById('root')
)
