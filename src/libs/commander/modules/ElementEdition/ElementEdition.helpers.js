import React from 'react'
import { AttributeInput } from './components/AttributeInput/AttributeInput.component'

export const turnAttributesIntoTableItems = ({ attributes, element }) => {
  return Object.entries(attributes).map(([attributeName, attributeValue]) => {
    const handleValueEnter = (newValue) => {
      element.setAttribute(attributeName, newValue)
    }
    const handleNameEnter = (newName) => {
      element.setAttribute(newName, attributeValue)
      element.removeAttribute(attributeName)
    }

    return [
      <AttributeInput
        placeholder='Attribute name'
        onEnter={handleNameEnter}
        defaultValue={attributeName}
      />,
      <AttributeInput
        placeholder='Attribute value'
        onEnter={handleValueEnter}
        defaultValue={attributeValue}
      />
    ]
  })
}
