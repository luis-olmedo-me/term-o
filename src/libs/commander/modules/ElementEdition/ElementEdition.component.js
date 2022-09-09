import React, { useState } from 'react'
import { getAttributes } from '../../components/CommandDom/CommandDom.helpers'
import { Table } from 'modules/components/Table/Table.component'
import { Input } from './ElementEdition.styles'

export const AttributeInput = ({ onEnter, defaultValue, placeholder }) => {
  const [attribute, setAttribute] = useState(defaultValue)

  const handleAttributeKeyUp = (event) => {
    if (event.key === 'Enter') {
      onEnter(attribute)

      setAttrOriginalName('')
    }
  }

  return (
    <Input
      type='text'
      value={attribute}
      placeholder={placeholder}
      onChange={(event) => setAttribute(event.target.value)}
      onKeyUp={handleAttributeKeyUp}
    />
  )
}

export const ElementEdition = ({ element }) => {
  const [newAtributeName, setNewAttributeName] = useState('')
  const [newAtributeValue, setNewAttributeValue] = useState('')

  const attributes = getAttributes(element)

  const attributeRows = Object.entries(attributes).map(
    ([attributeName, attributeValue]) => {
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
