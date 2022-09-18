import React, { useState } from 'react'
import { getAttributes } from '../../../../components/CommandDom/CommandDom.helpers'
import { Table } from 'modules/components/Table/Table.component'
import { Input } from '../AttributeInput'
import { parameterTypes } from '../../../../constants/commands.constants'
import { turnAttributesIntoTableItems } from './AttributeEditionLog.helpers'
import { usePaginationGroups } from 'modules/components/Table/hooks/usePaginationGroups.hook'
import { Carousel } from 'modules/components/Carousel/Carousel.component'
import { CarouselItem } from 'modules/components/Carousel/Carousel.styles'
import { Log } from '../../Log.component'

export const AttributeEditionLog = ({ element, onGoBack }) => {
  const [newAtributeName, setNewAttributeName] = useState('')
  const [newAtributeValue, setNewAttributeValue] = useState('')

  const attributes = getAttributes(element)

  const attributeRows = turnAttributesIntoTableItems({ attributes, element })
  const { buttonGroups, pages, pageNumber } = usePaginationGroups({
    items: attributeRows,
    maxItems: 2
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

  const editionPageButtonGroups = [
    {
      id: 'go-back',
      text: '<☰',
      onClick: onGoBack
    },
    ...buttonGroups
  ]

  return (
    <Log variant={parameterTypes.TABLE} buttonGroups={editionPageButtonGroups}>
      <Carousel itemInView={pageNumber}>
        {pages.map((page, currentPageNumber) => {
          return (
            <CarouselItem key={currentPageNumber}>
              <Table
                key={currentPageNumber}
                headers={['Attribute', 'Value']}
                rows={[...page, editableRow]}
                widths={[50, 50]}
              />
            </CarouselItem>
          )
        })}
      </Carousel>
    </Log>
  )
}
