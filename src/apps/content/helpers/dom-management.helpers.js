import { colorThemeKeys, customColorThemeKeys } from '@src/constants/themes.constants'
import { delay } from '@src/helpers/utils.helpers'

export const getElementXPath = element => {
  if (element.id !== '') return 'id("' + element.id + '")'
  if (element.parentElement === null) return element.tagName.toLowerCase()

  let childCount = 0
  let siblings = element.parentNode.childNodes

  for (let i = 0; i < siblings.length; i++) {
    let sibling = siblings[i]

    if (sibling === element)
      return (
        getElementXPath(element.parentNode) +
        '/' +
        element.tagName.toLowerCase() +
        '[' +
        (childCount + 1) +
        ']'
      )

    if (sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === element.tagName) {
      childCount++
    }
  }

  return ''
}

export const getElementByXPath = (xpath, below) => {
  return (below || window.document).evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue
}

export const getElementSibling = (element, siblingIndex) => {
  if (!siblingIndex) return element

  const isBelow = siblingIndex > 0
  const step = isBelow ? 1 : -1

  let foundSibling = element

  for (let index = 0; index !== siblingIndex; index += step) {
    foundSibling = isBelow ? foundSibling.nextSibling : foundSibling.previousSibling

    if (foundSibling === null) break
  }

  return foundSibling
}

export const getElementParent = (element, parentIndex) => {
  if (!parentIndex) return element

  let foundParent = element

  for (let index = 0; index !== parentIndex; index++) {
    foundParent = foundParent.parentElement

    if (foundParent === null) break
  }

  return foundParent
}

export const getElementChild = (element, childIndex) => {
  if (!childIndex) return element

  return element.children.item(childIndex)
}

export const createBubble = (message, theme, fontFamily) => {
  let timeoutId = null
  let intervalId = null
  const bubble = document.createElement('div')
  bubble.innerHTML = `
    <div style="
      display: flex;
      align-items: center;
      gap: 6px;
    ">
      <svg
        width="14"
        height="14"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M140.87 123.172L189.355 171.861L279.199 81.5806L230.745 32.9088C224.847 27.0005 216.377 24 209 24C203.841 24 194.786 25.4229 187.44 32.816L140.778 79.68C133.417 87.0576 132 96.152 132 101.333C132 108.742 134.988 117.249 140.87 123.172Z"
          fill=${theme[colorThemeKeys.WHITE]}
        />
        <path
          d="M187.425 479.184L140.778 432.32C133.417 424.942 132 415.848 132 410.667C132 403.258 134.988 394.751 140.87 388.828L149.502 380.16L239.351 470.445L230.745 479.091C224.847 484.999 216.377 488 209 488C203.841 488 194.786 486.577 187.425 479.184Z"
          fill=${theme[colorThemeKeys.WHITE]}
        />
        <path
          d="M239.351 470.445L149.502 380.16L273.141 256L189.355 171.861L279.199 81.5806L431.037 234.099C436.581 239.683 440 247.462 440 256C440 264.599 436.381 272.487 431.006 277.901L239.351 470.445Z"
          fill=${theme[customColorThemeKeys.ACCENT]}
        />
      </svg>
      <span>${message}</span>
    </div>
  `

  Object.assign(bubble.style, {
    position: 'fixed',
    bottom: '12px',
    right: '-100%',
    background: theme[colorThemeKeys.BACKGROUND],
    color: theme[customColorThemeKeys.ACCENT],
    border: `solid ${theme[customColorThemeKeys.ACCENT]}`,
    borderWidth: '1px 0 1px 1px',
    borderRadius: '10px 0 0 10px',
    padding: '10px 8px',
    fontSize: '13px',
    fontFamily: fontFamily,
    cursor: 'pointer',
    zIndex: '999999',
    boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
    transition:
      'transform 0.15s ease-in-out, opacity 0.4s ease-in-out, right 1s ease-in-out, color 2.5s ease-in-out, border-color 2s ease-in-out, box-shadow 2s linear'
  })
  bubble.onmouseenter = () => (bubble.style.transform = 'scale(1.05)')
  bubble.onmouseleave = () => (bubble.style.transform = 'scale(1)')
  document.body.appendChild(bubble)

  const remove = async () => {
    bubble.style.opacity = '0'
    bubble.style.pointerEvents = 'none'
    bubble.style.right = '-100%'
    await delay(700)
    clearTimeout(timeoutId)
    clearInterval(intervalId)
    bubble.remove()
  }

  const appear = async () => {
    await delay(50)
    bubble.style.right = '0'
    bubble.style.opacity = '1'
    bubble.style.color = theme[colorThemeKeys.FOREGROUND]
    bubble.style.boxShadow = `0 4px 10px ${theme[customColorThemeKeys.ACCENT]}66`
  }

  const toggleColor = () => {
    const currentColor = bubble.style.borderColor
    const accentColor = theme[customColorThemeKeys.ACCENT]

    bubble.style.borderColor = currentColor === 'transparent' ? accentColor : 'transparent'
    bubble.style.boxShadow = `0 4px 10px ${currentColor === 'transparent' ? `${accentColor}66` : `#00000066`}`
  }

  timeoutId = setTimeout(() => {
    timeoutId = null
    bubble.style.transition =
      'transform 0.15s ease-in-out, opacity 0.4s ease-in-out, right 1s ease-in-out, color 2.5s ease-in-out, border-color 1.5s ease-in-out, box-shadow 1.5s linear'

    intervalId = setInterval(() => {
      toggleColor()
    }, 1000)
  }, 1950)

  appear()
  return { element: bubble, remove, appear }
}
