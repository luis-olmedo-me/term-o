import * as React from 'react'
import { debounce } from 'src/helpers/utils.helpers.js'
import { Checkbox } from '../Checkbox/Checkbox.component'
import {
  TableActions,
  TableActionsWrapper,
  TableHeaderRowValue,
  TableRow,
  TableRowValue,
  TableWrapper
} from './Table.styles'

export const Table = ({
  rows,
  options,
  onSelectionChange,
  onSelectionAll,
  selectedRows
}) => {
  const wrapperRef = React.useRef(null)
  const [wrapperWidth, setWrapperWidth] = React.useState(0)

  React.useEffect(() => {
    const wrapper = wrapperRef.current

    const updateWidth = debounce(
      () => setWrapperWidth(wrapper.clientWidth),
      250
    )

    const obsever = new ResizeObserver(updateWidth)

    obsever.observe(wrapper)

    return () => obsever.unobserve(wrapper)
  }, [])

  const hasSelectionControls = Boolean(onSelectionChange && onSelectionAll)

  const parsedHeaders = hasSelectionControls
    ? [
        {
          id: 'selection',
          displayName: (
            <Checkbox
              onChange={onSelectionAll}
              checked={rows.every((row) => selectedRows.includes(row))}
            />
          ),
          width: '33px',
          minTableWidth: 0,
          center: true
        },
        ...options.columns
      ]
    : options.columns
  const parsedRows = hasSelectionControls
    ? rows.map((row) => {
        return [
          {
            id: 'selection',
            value: (
              <Checkbox
                onChange={() => onSelectionChange({ row })}
                checked={selectedRows.includes(row)}
              />
            ),
            width: '33px',
            minTableWidth: 0,
            center: true
          },
          ...row
        ]
      })
    : rows

  const minTableWidths = parsedHeaders.map((column) => column.minTableWidth)
  const widths = parsedHeaders.map((column) => column.width)
  const centerConditions = parsedHeaders.map((column) => column.center)

  return (
    <TableWrapper ref={wrapperRef}>
      <TableRow header>
        {parsedHeaders.map(({ id, width, displayName, minTableWidth }) => {
          const showColumn =
            wrapperWidth !== null && minTableWidth
              ? wrapperWidth > minTableWidth
              : true

          return (
            showColumn && (
              <TableHeaderRowValue
                key={`header-${id}`}
                width={width}
                hasFixedWidth={!width.endsWith('%')}
              >
                {displayName}
              </TableHeaderRowValue>
            )
          )
        })}
      </TableRow>

      {parsedRows.map((row, rowIndex) => (
        <TableRow key={`row-${rowIndex}`}>
          {row.map((column, columnIndex) => {
            const onColumnClick = () => column.onClick?.(column)

            const width = widths[columnIndex]
            const center = centerConditions[columnIndex]
            const showColumn =
              wrapperWidth !== null && minTableWidths[columnIndex]
                ? wrapperWidth > minTableWidths[columnIndex]
                : true

            return (
              showColumn && (
                <TableRowValue
                  key={`row-column-${columnIndex}`}
                  onClick={onColumnClick}
                  style={{ width }}
                  center={center}
                  hasFixedWidth={!width.endsWith('%')}
                >
                  {column.value}

                  {column.actions && (
                    <TableActionsWrapper className='actions'>
                      <TableActions actions={column.actions} />
                    </TableActionsWrapper>
                  )}
                </TableRowValue>
              )
            )
          })}
        </TableRow>
      ))}
    </TableWrapper>
  )
}
