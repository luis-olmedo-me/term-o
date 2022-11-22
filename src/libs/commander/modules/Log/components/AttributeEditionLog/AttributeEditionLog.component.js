import * as React from 'preact'
import { useState } from 'preact/hooks'

import { Carousel, CarouselItem } from '@modules/components/Carousel'
import { Table } from '@modules/components/Table/Table.component'
import { getAttributes } from '@src/helpers/dom.helpers'
import { parameterTypes } from '../../../../constants/commands.constants'
import { usePaginationActions } from '../../hooks/usePaginationActions'
import { Input } from '../AttributeInput'
import LogCard from '../LogCard'
import { attributeTableOptions } from './AttributeEditionLog.constants'
import { turnAttributesIntoTableItems } from './AttributeEditionLog.helpers'

export const AttributeEditionLog = ({ element, leftOptions = [], rightOptions = [] }) => {
  const [newAtributeName, setNewAttributeName] = useState('')
  const [newAtributeValue, setNewAttributeValue] = useState('')

  const attributes = getAttributes(element)

  const attributeRows = turnAttributesIntoTableItems({ attributes, element })
  const { paginationActions, pages, pageNumber } = usePaginationActions({
    items: attributeRows,
    maxItems: 9
  })

  const handleNewAttributeKeyUp = ({ key }) => {
    if (!newAtributeName || !newAtributeValue) return

    if (key === 'Enter') {
      element.setAttribute(newAtributeName, newAtributeValue)

      setNewAttributeName('')
      setNewAttributeValue('')
    }
  }

  const editableRow = [
    {
      value: (
        <Input
          type="text"
          placeholder="New attribute name"
          value={newAtributeName}
          onChange={event => setNewAttributeName(event.target.value)}
          onKeyUp={handleNewAttributeKeyUp}
        />
      )
    },
    {
      value: (
        <Input
          type="text"
          placeholder="New attribute value"
          value={newAtributeValue}
          onChange={event => setNewAttributeValue(event.target.value)}
          onKeyUp={handleNewAttributeKeyUp}
        />
      )
    }
  ]

  const parsedPages = pages.length ? pages.map(page => [...page, editableRow]) : [[editableRow]]

  const editionPageButtonGroups = [...leftOptions, ...paginationActions, ...rightOptions]

  return (
    <LogCard
      variant={parameterTypes.TABLE}
      actionGroups={editionPageButtonGroups}
      command={command}
      hasScroll
    >
      <Carousel itemInView={pageNumber}>
        {parsedPages.map((page, currentPageNumber) => {
          return (
            <CarouselItem key={currentPageNumber}>
              <Table rows={page} options={attributeTableOptions} />
            </CarouselItem>
          )
        })}
      </Carousel>
    </LogCard>
  )
}
