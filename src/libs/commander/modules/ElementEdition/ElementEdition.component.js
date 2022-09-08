import React, { useState } from 'react'
import { getAttributes } from '../../components/CommandDom/CommandDom.helpers'
import { Table } from 'modules/components/Table/Table.component'
import { Input } from './ElementEdition.styles'

export const ElementEdition = ({ element }) => {
  const attributes = getAttributes(element)

  const attributeRows = Object.entries(attributes).map(
    ([attributeName, attributeValue]) => {
      const [attrName, setAttrName] = useState(attributeName)
      const [attrValue, setAttrValue] = useState(attributeValue)
      const [attrOriginalName, setAttrOriginalName] = useState(attributeName)
      const [attrOriginalValue, setAttrOriginalValue] = useState(attributeValue)

      const handleAttributeNameChange = (event) => {
        setAttrName(event.target.value)
      }
      const handleAttributeValueChange = (event) => {
        setAttrValue(event.target.value)
      }

      const handleAttrValueKeyUp = (event) => {
        if (event.key === 'Enter') {
          element.setAttribute(attrName, attrValue)

          setAttrOriginalName(attrName)
          setAttrOriginalValue(attrName)
        } else if (event.key === 'Escape') {
          setAttrName(attrOriginalName)
          setAttrValue(attrOriginalValue)
        }
      }
      const handleAttrNameKeyUp = (event) => {
        if (event.key === 'Enter') {
          element.setAttribute(attrName, attrValue)
          element.removeAttribute(attrOriginalName)

          setAttrOriginalName(attrName)
          setAttrOriginalValue(attrName)
        } else if (event.key === 'Escape') {
          setAttrName(attrOriginalName)
          setAttrValue(attrOriginalValue)
        }
      }

      return [
        <Input
          type='text'
          value={attrName}
          onChange={handleAttributeNameChange}
          onKeyUp={handleAttrNameKeyUp}
        />,
        <Input
          type='text'
          value={attrValue}
          onChange={handleAttributeValueChange}
          onKeyUp={handleAttrValueKeyUp}
        />
      ]
    }
  )

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <Table
        headers={['Attribute', 'Value']}
        rows={attributeRows}
        widths={[50, 50]}
      />
    </div>
  )
}
