const attributeHeaderIds = {
  ATTRIBUTE: 'attribute',
  VALUE: 'value'
}

export const attributeTableOptions = {
  columns: [
    {
      id: attributeHeaderIds.ATTRIBUTE,
      displayName: 'Attribute',
      width: 50,
      minTableWidth: 0
    },
    {
      id: attributeHeaderIds.VALUE,
      displayName: 'Value',
      width: 50,
      minTableWidth: 0
    }
  ]
}
