import * as React from 'react'
import {
  TableWrapper,
  TableRowValue,
  TableRow,
  TableActions,
  TableActionsWrapper
} from './Table.styles'
import { debounce } from 'src/helpers/utils.helpers.js'
import { getWidthOffset } from './Table.helpers'

export const Table = ({ headers, rows, widths, minTableWidths = [] }) => {
  const wrapperRef = React.useRef(null)
  const [wrapperWidth, setWrapperWidth] = React.useState(null)

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

  const widthOffset = getWidthOffset({ minTableWidths, wrapperWidth, total })

  return (
    <TableWrapper ref={wrapperRef}>
      <TableRow header>
        {headers.map((header, index) => {
          const width = widths[index]
          const showColumn =
            wrapperWidth !== null && minTableWidths[index]
              ? wrapperWidth > minTableWidths[index]
              : true

          return (
            showColumn && (
              <span
                key={`header-${header}`}
                style={{ flex: width + widthOffset / 100 }}
              >
                {header}
              </span>
            )
          )
        })}
      </TableRow>

      {rows.map((row, rowIndex) => (
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
                  style={{ flex: width + widthOffset / 100 }}
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
