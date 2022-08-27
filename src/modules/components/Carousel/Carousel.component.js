import React, { useState } from 'react'
import { CarouselWrapper, AnimatedEffect } from './Carousel.styles'

export const Carousel = ({ itemInView, children }) => {
  const wrapperReference = React.useRef(null)
  const [oldItemInView, setOldItemInView] = useState(itemInView)

  React.useEffect(() => {
    return () => setOldItemInView(itemInView)
  }, [itemInView])

  const isGoingRight = oldItemInView < itemInView

  return (
    <CarouselWrapper ref={wrapperReference}>
      {children.map((child, index) => {
        const isSelected = index === itemInView

        return (
          isSelected && (
            <AnimatedEffect
              key={index}
              style={{ transform: 'scaleX(1)' }}
              isGoingRight={isGoingRight}
            >
              {child}
            </AnimatedEffect>
          )
        )
      })}
    </CarouselWrapper>
  )
}
