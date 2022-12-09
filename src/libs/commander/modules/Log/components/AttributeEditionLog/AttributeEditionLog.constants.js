import * as React from 'preact'
import AttributeInput from '../AttributeInput'

const attributeHeaderIds = {
  ATTRIBUTE: 'attribute',
  VALUE: 'value'
}

export const attributeTableOptions = {
  columns: [
    {
      id: attributeHeaderIds.ATTRIBUTE,
      displayName: 'Attribute',
      width: '50%',
      minTableWidth: 0,
      internal: false,
      field: 'attributeName',
      cellRenderer: 'attrNameEditor'
    },
    {
      id: attributeHeaderIds.VALUE,
      displayName: 'Value',
      width: '50%',
      minTableWidth: 0,
      internal: false,
      field: 'attributeValue',
      cellRenderer: 'attrValueEditor'
    }
  ]
}

export const tableComponents = {
  attrNameEditor: ({ value, row }) => {
    const handleNameEnter = newName => {
      row.element.setAttribute(newName, row.attributeValue)
      row.element.removeAttribute(value)
    }

    return (
      <AttributeInput placeholder="Attribute name" onEnter={handleNameEnter} defaultValue={value} />
    )
  },
  attrValueEditor: ({ value, row }) => {
    const handleValueEnter = newValue => {
      row.element.setAttribute(row.attributeName, newValue)
    }

    return (
      <AttributeInput
        placeholder="Attribute value"
        onEnter={handleValueEnter}
        defaultValue={value}
      />
    )
  }
}
