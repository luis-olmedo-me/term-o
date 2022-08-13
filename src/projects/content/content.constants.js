import shadowRoot from 'react-shadow/styled-components'

const appRoot = document.createElement('div')
appRoot.id = 'term-o-root'
appRoot.dataset.isOpen = 'false'

export { appRoot, shadowRoot }
