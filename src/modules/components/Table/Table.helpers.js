export const getWidthOffset = ({
  minTableWidths,
  wrapperWidth,
  widths,
  total
}) => {
  if (wrapperWidth === null) return 0
  if (minTableWidths.length === 0) return 0

  const hidden = minTableWidths.filter((width) => width > wrapperWidth).length
  const visibles = total - hidden
  const division = hidden / visibles

  return widths.reduce((result, width) => {
    const isHidden = width > wrapperWidth

    return isHidden ? result + width / division : result
  }, 0)
}
