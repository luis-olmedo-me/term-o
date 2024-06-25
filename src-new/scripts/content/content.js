// import * as React from 'preact'

// import { FontFamilies } from './fonts/Fonts.styles'

console.log('Hello world from content!')

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'get-dom-elements') {
    sendResponse(['div'])
  }
})

// const appRoot = document.createElement('div')
// document.body.prepend(appRoot)

// const ExtensionApp = () => {
//   console.log('Hello World from content.js inside the ExtensionApp!')

//   return <p>Hi</p>
// }

// React.render(
//   <>
//     <FontFamilies />

//     <ExtensionApp />
//   </>,
//   appRoot
// )
