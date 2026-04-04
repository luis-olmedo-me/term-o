export const calculatePosition = (element, pointX, pointY) => {
  const errorGap = 15

  const width = element.clientWidth
  const height = element.clientHeight
  const limitX = window.innerWidth - errorGap
  const limitY = window.innerHeight - errorGap

  let sideX = null
  let sideY = null

  if (pointX + width < limitX) sideX = pointX
  else sideX = pointX - width

  if (pointY + height < limitY) sideY = pointY
  else sideY = pointY - height

  return [sideX, sideY]
}
