import React from 'react'
import { getAttributes } from '../../components/CommandDom/CommandDom.helpers'
import { Table } from 'modules/components/Table/Table.component'
import { AttributeName, Input } from './ElementEdition.styles'

export const ElementEdition = ({ element }) => {
  const attributes = getAttributes(element)

  const attributeRows = Object.entries(attributes).map(
    ([attributeName, attributeValue]) => {
      return [
        <AttributeName>{attributeName}</AttributeName>,
        <Input type='text' value={attributeValue} />
      ]
    }
  )

  return (
    <Table
      headers={['Attribute', 'Value']}
      rows={attributeRows}
      widths={[50, 50]}
    />
  )
}
