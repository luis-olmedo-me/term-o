import * as React from 'react'
import { debounce } from 'src/helpers/utils.helpers.js'
import {
  TableActions,
  TableActionsWrapper,
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
            <input
              type='checkbox'
              onChange={onSelectionAll}
              checked={rows.every((row) => selectedRows.includes(row))}
            />
          ),
          width: '25px',
          minTableWidth: 0
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
              <input
                type='checkbox'
                onChange={() => onSelectionChange({ row })}
                checked={selectedRows.includes(row)}
              />
            ),
            width: '25px',
            minTableWidth: 0
          },
          ...row
        ]
      })
    : rows

  const minTableWidths = parsedHeaders.map((column) => column.minTableWidth)
  const widths = parsedHeaders.map((column) => column.width)

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
              <span key={`header-${id}`} style={{ width }}>
                {displayName}
              </span>
            )
          )
        })}
      </TableRow>

      {parsedRows.map((row, rowIndex) => (
        <TableRow key={`row-${rowIndex}`}>
          {row.map((column, columnIndex) => {
            const onColumnClick = () => column.onClick?.(column)

            const width = widths[columnIndex]
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
