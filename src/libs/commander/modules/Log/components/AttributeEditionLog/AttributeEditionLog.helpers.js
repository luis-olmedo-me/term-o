import * as React from 'preact'
import { AttributeInput } from '../AttributeInput'

export const turnAttributesIntoTableItems = ({ attributes, element }) => {
  return Object.entries(attributes).map(([attributeName, attributeValue]) => {
    const handleValueEnter = newValue => {
      element.setAttribute(attributeName, newValue)
    }
    const handleNameEnter = newName => {
      element.setAttribute(newName, attributeValue)
      element.removeAttribute(attributeName)
    }

    return [
      {
        value: (
          <AttributeInput
            placeholder="Attribute name"
            onEnter={handleNameEnter}
            defaultValue={attributeName}
          />
        ),
        internal: false
      },
      {
        value: (
          <AttributeInput
            placeholder="Attribute value"
            onEnter={handleValueEnter}
            defaultValue={attributeValue}
          />
        ),
        internal: false
      }
    ]
  })
}
