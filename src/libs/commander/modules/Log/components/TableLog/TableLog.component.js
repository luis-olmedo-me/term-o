import * as React from 'preact'
import { useRef } from 'preact/hooks'

import { parameterTypes } from 'libs/commander/constants/commands.constants'
import { Carousel, CarouselItem } from 'modules/components/Carousel'
import { Table } from 'modules/components/Table'
import usePaginationActions from '../../hooks/usePaginationActions'
import useTableSelection from '../../hooks/useTableSelection'
import useViews from '../../hooks/useViews'
import LogCard from '../LogCard'
import { tableLogViewIds, tableLogViews } from './TableLog.constants'

export const TableLog = ({
  tableItems,
  command,
  maxItems,
  onSelectionDelete,
  options,
  hasSelection,
  leftActions = [],
  rightActions = [],
  components,
  actions
}) => {
  const logRef = useRef(null)

  const { paginationActions, pages, pagesCount, pageNumber, changePage } = usePaginationActions({
    items: tableItems,
    maxItems
  })
  const { tableSelectionProps, selectionActions } = useTableSelection({
    changePage,
    onDelete: onSelectionDelete,
    currentRows: pages[pageNumber],
    tableItems,
    pages,
    maxItems,
    isEnabled: hasSelection
  })

  const {
    viewActions: [headToMain, headToConfig],
    itemInView,
    changeView
  } = useViews({
    views: tableLogViews,
    defaultView: tableLogViewIds.TABLE
  })

  const isTableView = itemInView === tableLogViewIds.TABLE

  const dynamicItemInView = isTableView ? pageNumber : itemInView + pagesCount - 1
  const logCardActions = isTableView
    ? [...leftActions, ...paginationActions, ...selectionActions, ...rightActions, headToConfig]
    : [headToMain]

  return (
    <LogCard variant={parameterTypes.TABLE} actions={logCardActions} command={command} ref={logRef}>
      <Carousel itemInView={dynamicItemInView}>
        {pages.map((page, currentPageNumber) => {
          return (
            <CarouselItem key={currentPageNumber}>
              <Table
                {...tableSelectionProps}
                rows={page}
                options={options}
                widthRef={logRef}
                components={components}
                actions={actions}
              />
            </CarouselItem>
          )
        })}

        <CarouselItem>
          <button onClick={() => changeView(tableLogViewIds.TABLE)}>back</button>
        </CarouselItem>
      </Carousel>
    </LogCard>
  )
}
