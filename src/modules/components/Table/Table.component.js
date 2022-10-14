import * as React from 'react'
import {
  TableWrapper,
  TableRowValue,
  TableRow,
  TableActions,
  TableActionsWrapper
} from './Table.styles'
import { debounce } from 'src/helpers/utils.helpers.js'

export const Table = ({ headers, rows, widths, minTableWidths = [] }) => {
  const wrapperRef = React.useRef(null)
  const [wrapperWidth, setWrapperWidth] = React.useState(null)

  React.useEffect(() => {
    const wrapper = wrapperRef.current

    const updateWidth = debounce(
      () => setWrapperWidth(wrapper.clientWidth),
      500
    )

    const obsever = new ResizeObserver(updateWidth)

    obsever.observe(wrapper)

    return () => obsever.unobserve(wrapper)
  }, [])

  const hidden = minTableWidths.filter((width) => width > wrapperWidth).length
  const visibles = headers.length - hidden
  const division = hidden / visibles
  const widthOffset = widths.reduce((result, width) => {
    const isHidden = width > wrapperWidth

    return isHidden ? result + width / division : result
  }, 0)

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
