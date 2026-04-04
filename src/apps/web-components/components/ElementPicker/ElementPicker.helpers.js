export const calculatePosition = (element, pointX, pointY) => {
  const errorGap = 15
  const marginGap = 10

  const width = element.clientWidth
  const height = element.clientHeight
  const limitX = window.innerWidth - errorGap
  const limitY = window.innerHeight - errorGap

  let sideX = null
  let sideY = null

  if (pointX + width < limitX) sideX = pointX + marginGap
  else sideX = pointX - width - marginGap

  if (pointY + height < limitY) sideY = pointY + marginGap
  else sideY = pointY - height - marginGap

  return [sideX, sideY]
}
