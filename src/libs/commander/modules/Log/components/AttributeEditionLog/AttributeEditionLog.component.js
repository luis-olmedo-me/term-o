import * as React from 'preact'
import { useState } from 'preact/hooks'

import { Carousel, CarouselItem } from '@modules/components/Carousel'
import { Table } from '@modules/components/Table/Table.component'
import { getAttributes } from '@src/helpers/dom.helpers'
import { parameterTypes } from '../../../../constants/commands.constants'
import usePaginationActions from '../../hooks/usePaginationActions'
import AttributeInput, { Input } from '../AttributeInput'
import LogCard from '../LogCard'
import TableLog from '../TableLog'
import { attributeTableOptions } from './AttributeEditionLog.constants'
import { turnAttributesIntoTableItems } from './AttributeEditionLog.helpers'

const components = {
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
      element.setAttribute(row.attributeName, newValue)
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
      components={components}
    />
  )
}
