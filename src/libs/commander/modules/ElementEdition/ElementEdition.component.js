import React, { useState } from 'react'
import { getAttributes } from '../../components/CommandDom/CommandDom.helpers'
import { Table } from 'modules/components/Table/Table.component'
import { Input } from './components/AttributeInput/AttributeInput.styles'
import { parameterTypes } from '../../constants/commands.constants'
import { turnAttributesIntoTableItems } from './ElementEdition.helpers'

export const ElementEdition = ({ element }) => {
  const [newAtributeName, setNewAttributeName] = useState('')
  const [newAtributeValue, setNewAttributeValue] = useState('')

  const attributes = getAttributes(element)

  const attributeRows = turnAttributesIntoTableItems({ attributes, element })

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

  const editionPageButtonGroups = [
    {
      id: 'go-back',
      text: '<',
      onClick: () => setEditingElement(null)
    }
  ]

  return (
    <LogWrapper
      variant={parameterTypes.TABLE}
      buttonGroups={editionPageButtonGroups}
    >
      <Table headers={['Attribute', 'Value']} rows={rows} widths={[50, 50]} />
    </LogWrapper>
  )
}
