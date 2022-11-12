const root = document.createElement('div')
root.id = 'term-o-root'
root.dataset.isOpen = 'false'
root.dataset.isInitiated = 'false'

const termoBody = document.createElement('body')
termoBody.setAttribute('style', 'all: unset')
termoBody.setAttribute('id', 'term-o-body')
termoBody.append(root)

const shadow = root.attachShadow({ mode: 'open' })

document.documentElement.append(termoBody)

export { shadow }
