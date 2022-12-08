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
