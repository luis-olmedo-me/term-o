import * as React from 'preact'

import { parameterTypes } from 'libs/commander/constants/commands.constants'
import { Carousel, CarouselItem } from 'modules/components/Carousel'
import { Table } from 'modules/components/Table'
import { useState } from 'preact/hooks'
import usePaginationActions from '../../hooks/usePaginationActions'
import useTableSelection from '../../hooks/useTableSelection'
import useViews from '../../hooks/useViews'
import LogCard from '../LogCard'
import { tableLogTableOptions, tableLogViewIds, tableLogViews } from './TableLog.constants'
import { createTableLogActionsCreatorPerRow } from './TableLog.helpers'

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
  actions = []
}) => {
  const [columns, setColumns] = useState(options.columns)

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

  const handleMoveColumnDown = ({ row: column }) => {
    const columnsCopy = [...columns]

    const columnIndex = columnsCopy.findIndex(columnCopy => columnCopy.id === column.id)
    const nextColumnIndex = columnIndex - 1

    const nextColumn = columnsCopy[nextColumnIndex]

    columnsCopy[columnIndex] = nextColumn
    columnsCopy[nextColumnIndex] = column

    setColumns(columnsCopy)
  }

  const handleMoveColumnUp = ({ row: column }) => {
    const columnsCopy = [...columns]

    const columnIndex = columnsCopy.findIndex(columnCopy => columnCopy.id === column.id)
    const previousColumnIndex = columnIndex + 1

    const previousColumn = columnsCopy[previousColumnIndex]

    columnsCopy[columnIndex] = previousColumn
    columnsCopy[previousColumnIndex] = column

    setColumns(columnsCopy)
  }

  const createActionsPerRow = createTableLogActionsCreatorPerRow({
    onMoveUpClick: handleMoveColumnUp,
    onMoveDownClick: handleMoveColumnDown,
    columns
  })

  return (
    <LogCard variant={parameterTypes.TABLE} actions={logCardActions} command={command}>
      <Carousel itemInView={dynamicItemInView}>
        {pages.map((page, currentPageNumber) => {
          return (
            <CarouselItem key={currentPageNumber}>
              <Table
                {...tableSelectionProps}
                rows={page}
                options={{ ...options, columns }}
                components={components}
                actions={actions}
              />
            </CarouselItem>
          )
        })}

        <CarouselItem>
          <Table
            rows={columns}
            options={tableLogTableOptions}
            createActionsPerRow={createActionsPerRow}
            actionsAlwaysVisible
          />
        </CarouselItem>
      </Carousel>
    </LogCard>
  )
}
