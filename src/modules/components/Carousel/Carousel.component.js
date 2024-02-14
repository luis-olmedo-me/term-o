import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { AnimatedEffect, CarouselWrapper } from './Carousel.styles'

const getAnimationDirection = (isGoingRight, isTheSame) => {
  if (isTheSame) return 'center'
  else if (isGoingRight) return 'right'
  else return 'left'
}

export const Carousel = ({ itemInView, children }) => {
  const wrapperReference = useRef(null)
  const [oldItemInView, setOldItemInView] = useState(itemInView)

  useEffect(() => {
    return () => {
      setOldItemInView(itemInView)
    }
  }, [itemInView])

  const flattedChildren = children.flat()

  const isGoingRight = oldItemInView < itemInView
  const isTheSame = oldItemInView === itemInView

  const direction = getAnimationDirection(isGoingRight, isTheSame)
  const selectedItem = flattedChildren[itemInView]

  return (
    <CarouselWrapper ref={wrapperReference}>
      {selectedItem && (
        <AnimatedEffect key={itemInView} direction={direction}>
          {selectedItem}
        </AnimatedEffect>
      )}
    </CarouselWrapper>
  )
}
