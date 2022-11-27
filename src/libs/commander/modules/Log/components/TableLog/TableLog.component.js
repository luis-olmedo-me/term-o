import * as React from 'preact'
import { useRef } from 'preact/hooks'

import { parameterTypes } from 'libs/commander/constants/commands.constants'
import { Carousel, CarouselItem } from 'modules/components/Carousel'
import { Table } from 'modules/components/Table'
import usePaginationActions from '../../hooks/usePaginationActions'
import useTableSelection from '../../hooks/useTableSelection'
import LogCard from '../LogCard'

export const TableLog = ({ tableItems, command, maxItems, onSelectionDelete, options }) => {
  const logRef = useRef(null)

  const { paginationActions, pages, pageNumber, changePage } = usePaginationActions({
    items: tableItems,
    maxItems
  })
  const { tableSelectionProps, selectionActions } = useTableSelection({
    changePage,
    onDelete: onSelectionDelete,
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
      ref={logRef}
    >
      <Carousel itemInView={pageNumber}>
        {pages.map((page, currentPageNumber) => {
          return (
            <CarouselItem key={currentPageNumber}>
              <Table {...tableSelectionProps} rows={page} options={options} widthRef={logRef} />
            </CarouselItem>
          )
        })}
      </Carousel>
    </LogCard>
  )
}
