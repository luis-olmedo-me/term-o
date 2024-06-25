// import * as React from 'preact'

// import { FontFamilies } from './fonts/Fonts.styles'

// console.log('Hello world from content!')
const getElementsFromDOM = patterns => {
  try {
    const elementsFromDOM = (patterns?.length && window.document.querySelectorAll(patterns)) || []

    return [...elementsFromDOM]
  } catch {
    return []
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { data, type } = message

  if (type === 'get-dom-elements') {
    const elementsFromDOM = getElementsFromDOM(data.get)
    const stringifiedElements = elementsFromDOM.map(element => element.tagName.toLowerCase())

    sendResponse(stringifiedElements)
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
