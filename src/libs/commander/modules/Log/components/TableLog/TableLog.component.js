import * as React from 'preact'

import { parameterTypes } from 'libs/commander/constants/commands.constants'
import { Carousel, CarouselItem } from 'modules/components/Carousel'
import { Table } from 'modules/components/Table'
import usePaginationActions from '../../hooks/usePaginationActions'
import useTableSelection from '../../hooks/useTableSelection'
import useViews from '../../hooks/useViews'
import LogCard from '../LogCard'
import { tableLogTableOptions, tableLogViewIds, tableLogViews } from './TableLog.constants'

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
    itemInView
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
    <LogCard variant={parameterTypes.TABLE} actions={logCardActions} command={command}>
      <Carousel itemInView={dynamicItemInView}>
        {pages.map((page, currentPageNumber) => {
          return (
            <CarouselItem key={currentPageNumber}>
              <Table
                {...tableSelectionProps}
                rows={page}
                options={options}
                components={components}
                actions={actions}
              />
            </CarouselItem>
          )
        })}

        <CarouselItem>
          <Table rows={options.columns} options={tableLogTableOptions} />
        </CarouselItem>
      </Carousel>
    </LogCard>
  )
}
