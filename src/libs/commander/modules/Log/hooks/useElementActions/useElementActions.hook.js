import { useState } from 'react'

export const useElementActions = ({ onAttributeEdit, onStyleEdit }) => {
  const [selectedElements, setSelectedElements] = useState([])

  const handleScrollIntoView = (element) => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }
  const handleCopyXPath = (element) => {
    const xPath = createXPathFromElement(element)

    navigator.clipboard.writeText(xPath.includes(' ') ? `"${xPath}"` : xPath)
  }
  const handleKill = () => {
    selectedElements.forEach((element) => element.remove())
    setSelectedElements([...selectedElements])
  }

  const handleElementSelection = (element, accumulate) => {
    if (selectedElements.includes(element)) {
      const filteredSelectedElements = selectedElements.filter(
        (oldElement) => oldElement !== element
      )

      setSelectedElements(accumulate ? filteredSelectedElements : [])
      return
    }

    setSelectedElements(accumulate ? [...selectedElements, element] : [element])
  }

  const hasOneSelectedElement = selectedElements.length === 1
  const hasSelectedElements = selectedElements.length > 0
  const hasAllElementsInDom = selectedElements.every((element) =>
    document.contains(element)
  )

  const [firstSelectedElement] = selectedElements

  const elementActions = [
    {
      id: 'edit-element',
      disabled: !hasOneSelectedElement,
      onClick: () => onAttributeEdit(firstSelectedElement),
      text: '✏️'
    },
    {
      id: 'change-styles',
      disabled: !hasOneSelectedElement,
      onClick: () => onStyleEdit(firstSelectedElement),
      text: '✂️'
    },
    {
      id: 'scroll-into-view-option',
      disabled: !hasOneSelectedElement,
      onClick: () => handleScrollIntoView(firstSelectedElement),
      text: '👁️'
    },
    {
      id: 'copy-xpath-option',
      disabled: !hasOneSelectedElement,
      onClick: () => handleCopyXPath(firstSelectedElement),
      text: '📋'
    },
    {
      id: 'kill-element',
      onClick: handleKill,
      disabled: !hasAllElementsInDom || !hasSelectedElements,
      text: '💀'
    }
  ]

  return {
    elementActions,
    selectElement: handleElementSelection,
    selectedElements
  }
}
