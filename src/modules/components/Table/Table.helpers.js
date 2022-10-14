export const getWidthOffset = ({ minTableWidths, wrapperWidth, total }) => {
  const hidden = minTableWidths.filter((width) => width > wrapperWidth).length
  const visibles = total - hidden
  const division = hidden / visibles

  return widths.reduce((result, width) => {
    const isHidden = width > wrapperWidth

    return isHidden ? result + width / division : result
  }, 0)
}
