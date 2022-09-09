import React, { useState } from 'react'
import { getAttributes } from '../../components/CommandDom/CommandDom.helpers'
import { Table } from 'modules/components/Table/Table.component'
import { Input } from './ElementEdition.styles'

export const ElementEdition = ({ element }) => {
  const [newAtributeName, setNewAttributeName] = useState('')
  const [newAtributeValue, setNewAttributeValue] = useState('')

  const attributes = getAttributes(element)

  const attributeRows = Object.entries(attributes).map(
    ([attributeName, attributeValue]) => {
      const [attrName, setAttrName] = useState(attributeName)
      const [attrValue, setAttrValue] = useState(attributeValue)
      const [attrOriginalName, setAttrOriginalName] = useState(attributeName)

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
        }
      }
      const handleAttrNameKeyUp = (event) => {
        if (event.key === 'Enter') {
          element.setAttribute(attrName, attrValue)
          element.removeAttribute(attrOriginalName)

          setAttrOriginalName(attrName)
        }
      }

      return [
        <Input
          type='text'
          value={attrName}
          placeholder='Attribute name'
          onChange={handleAttributeNameChange}
          onKeyUp={handleAttrNameKeyUp}
        />,
        <Input
          type='text'
          value={attrValue}
          placeholder='Attribute value'
          onChange={handleAttributeValueChange}
          onKeyUp={handleAttrValueKeyUp}
        />
      ]
    }
  )

  const handleNewAttributeKeyUp = ({ key }) => {
    if (key === 'Enter') {
      element.setAttribute(newAtributeName, newAtributeValue)

      setNewAttributeName('')
      setNewAttributeValue('')
    }
  }

  const rows = [
    ...attributeRows,
    [
      <Input
        type='text'
        placeholder='New attribute name'
        value={newAtributeName}
        onChange={(event) => setNewAttributeName(event.target.value)}
        onKeyUp={handleNewAttributeKeyUp}
      />,
      <Input
        type='text'
        placeholder='New attribute value'
        value={newAtributeValue}
        onChange={(event) => setNewAttributeValue(event.target.value)}
        onKeyUp={handleNewAttributeKeyUp}
      />
    ]
  ]

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <Table headers={['Attribute', 'Value']} rows={rows} widths={[50, 50]} />
    </div>
  )
}
