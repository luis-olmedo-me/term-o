import React, { useEffect, useLayoutEffect, useState } from 'react'
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

  return (
    <CarouselWrapper ref={wrapperReference}>
      {children.map((child, index) => {
        const isSelected = index === itemInView

        return (
          isSelected && (
            <AnimatedEffect key={index} direction={direction}>
              {child}
            </AnimatedEffect>
          )
        )
      })}
    </CarouselWrapper>
  )
}
