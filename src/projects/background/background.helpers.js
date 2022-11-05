export const toggleTerminal = () => {
  const toggleEvent = new Event('term-o-toggle-console')

  dispatchEvent(toggleEvent)
}

export const resizeRight = () => {
  const resizeEvent = new CustomEvent('term-o-resize', {
    detail: { side: 'right' }
  })

  dispatchEvent(resizeEvent)
}
export const resizeLeft = () => {
  const resizeEvent = new CustomEvent('term-o-resize', {
    detail: { side: 'left' }
  })

  dispatchEvent(resizeEvent)
}
export const resizeFull = () => {
  const resizeEvent = new CustomEvent('term-o-resize', {
    detail: { side: 'full' }
  })

  dispatchEvent(resizeEvent)
}

export const mergeAliases = (aliasesA, aliasesB) => {
  return aliasesB.reduce((aliases, aliasB) => {
    const isRepeated = aliases.some((entity) => entity.name === aliasB.name)

    return isRepeated
      ? aliases.map((entity) => (entity.name === aliasB.name ? aliasB : entity))
      : [...aliases, aliasB]
  }, aliasesA)
}
