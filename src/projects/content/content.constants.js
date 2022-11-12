const appContainer = document.createElement('div')
const styleContainer = document.createElement('div')
styleContainer.appendChild(appContainer)

const root = document.createElement('div')
root.id = 'term-o-root'
root.dataset.isOpen = 'false'
root.dataset.isInitiated = 'false'

const termoBody = document.createElement('body')
termoBody.setAttribute('id', 'term-o-body')
termoBody.append(root)

const shadow = root.attachShadow({ mode: 'open' })
shadow.appendChild(styleContainer)

document.documentElement.append(termoBody)

export { appContainer, styleContainer }
