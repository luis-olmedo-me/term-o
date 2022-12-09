import * as React from 'preact'

import { getAttributes } from '@src/helpers/dom.helpers'
import TableLog from '../TableLog'
import { attributeTableOptions, tableComponents } from './AttributeEditionLog.constants'
import { turnAttributesIntoTableItems } from './AttributeEditionLog.helpers'

export const AttributeEditionLog = ({ element, leftOptions = [], rightOptions = [], command }) => {
  const attributes = getAttributes(element)
  const attributeRows = turnAttributesIntoTableItems({ attributes, element })

  return (
    <TableLog
      command={command}
      maxItems={10}
      tableItems={attributeRows}
      options={attributeTableOptions}
      hasSelection={false}
      leftActions={leftOptions}
      rightActions={rightOptions}
      components={tableComponents}
    />
  )
}
