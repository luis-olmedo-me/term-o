import * as React from 'react'
import { useEffect, useState } from 'react'
import { CarouselWrapper, AnimatedEffect } from './Carousel.styles'

const getAnimationDirection = (isGoingRight, isTheSame) => {
  if (isTheSame) return 'center'
  else if (isGoingRight) return 'right'
  else return 'left'
}

export const Carousel = ({ itemInView, children }) => {
  const wrapperReference = React.useRef(null)
  const [oldItemInView, setOldItemInView] = useState(itemInView)

  useEffect(() => {
    return () => {
      setOldItemInView(itemInView)
    }
  }, [itemInView])

  const isGoingRight = oldItemInView < itemInView
  const isTheSame = oldItemInView === itemInView

  const direction = getAnimationDirection(isGoingRight, isTheSame)
  const selectedItem = children[itemInView]

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
