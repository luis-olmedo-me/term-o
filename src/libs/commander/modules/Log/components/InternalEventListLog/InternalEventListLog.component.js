import * as React from 'preact'

import { parameterTypes } from 'libs/commander/constants/commands.constants'
import { Carousel, CarouselItem } from 'modules/components/Carousel'
import { Table } from 'modules/components/Table'
import usePaginationActions from '../../hooks/usePaginationActions'
import useTableSelection from '../../hooks/useTableSelection'
import LogCard from '../LogCard'

export const InternalEventListLog = ({ tableItems, command, maxItems, onDelete, options }) => {
  const { paginationActions, pages, pageNumber, changePage } = usePaginationActions({
    items: tableItems,
    maxItems
  })
  const { tableSelectionProps, selectionActions } = useTableSelection({
    changePage,
    onDelete,
    currentRows: pages[pageNumber],
    tableItems,
    pages,
    maxItems
  })

  return (
    <LogCard
      variant={parameterTypes.TABLE}
      actions={[...paginationActions, ...selectionActions]}
      command={command}
    >
      <Carousel itemInView={pageNumber}>
        {pages.map((page, currentPageNumber) => {
          return (
            <CarouselItem key={currentPageNumber}>
              <Table {...tableSelectionProps} rows={page} options={options} />
            </CarouselItem>
          )
        })}
      </Carousel>
    </LogCard>
  )
}
