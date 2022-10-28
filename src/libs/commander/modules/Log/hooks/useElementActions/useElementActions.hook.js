import * as React from 'react'
import { Copy } from 'src/modules/icons/Copy.icon'
import { Eye } from 'src/modules/icons/Eye.icon'
import { Palette } from 'src/modules/icons/Palette.icon'
import { Pencil } from 'src/modules/icons/Pencil.icon'
import { Root } from 'src/modules/icons/Root.icon'
import { Skull } from 'src/modules/icons/Skull.icon'
import { createXPathFromElement } from './useElementActions.helpers'

export const useElementActions = ({
  onAttributeEdit,
  onStyleEdit,
  onRootEdit
}) => {
  const [selectedElements, setSelectedElements] = React.useState([])

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
  const isRootChangeEnabled = firstSelectedElement
    ? firstSelectedElement.childElementCount > 0
    : true

  const elementActions = [
    {
      id: 'edit-element',
      disabled: !hasOneSelectedElement,
      onClick: () => onAttributeEdit(firstSelectedElement),
      text: <Pencil />
    },
    {
      id: 'change-styles',
      disabled: !hasOneSelectedElement,
      onClick: () => onStyleEdit(firstSelectedElement),
      text: <Palette />
    },
    {
      id: 'scroll-into-view-option',
      disabled: !hasOneSelectedElement,
      onClick: () => handleScrollIntoView(firstSelectedElement),
      text: <Eye />
    },
    {
      id: 'copy-xpath-option',
      disabled: !hasOneSelectedElement,
      onClick: () => handleCopyXPath(firstSelectedElement),
      text: <Copy />
    },
    {
      id: 'delete-element',
      onClick: handleKill,
      disabled: !hasAllElementsInDom || !hasSelectedElements,
      text: <Skull />
    },
    {
      id: 'change-root',
      onClick: () => onRootEdit(firstSelectedElement),
      disabled: !hasOneSelectedElement || !isRootChangeEnabled,
      text: <Root />
    }
  ]

  return {
    elementActions,
    selectElement: handleElementSelection,
    selectedElements
  }
}
