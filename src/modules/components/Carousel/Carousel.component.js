import React, { useEffect, useState } from 'react'
import { CarouselWrapper, AnimatedEffect } from './Carousel.styles'

const getAnimationDirection = (isGoingRight, isTheSame) => {
  if (isTheSame) return 'center'
  else if (isGoingRight) return 'right'
  else return 'left'
}

export const Carousel = ({ itemInView, children }) => {
  const wrapperReference = React.useRef(null)
  const [oldItemInView, setOldItemInView] = useState(itemInView)
  const [minimumHeight, setMinimumHeight] = useState(0)

  useEffect(() => {
    return () => {
      setOldItemInView(itemInView)
    }
  }, [itemInView])

  useEffect(() => {
    const wrapper = wrapperReference.current

    const updateMinimumHeight = () => {
      const newHeight = wrapper?.clientHeight

      setMinimumHeight((oldHeight) =>
        newHeight > oldHeight ? newHeight : oldHeight
      )
    }

    const obsever = new ResizeObserver(updateMinimumHeight)

    obsever.observe(wrapper)

    return () => obsever.unobserve(wrapper)
  }, [])

  const isGoingRight = oldItemInView < itemInView
  const isTheSame = oldItemInView === itemInView

  const direction = getAnimationDirection(isGoingRight, isTheSame)

  return (
    <CarouselWrapper ref={wrapperReference}>
      {children.map((child, index) => {
        const isSelected = index === itemInView

        return (
          isSelected && (
            <AnimatedEffect
              key={index}
              direction={direction}
              style={{ minHeight: minimumHeight }}
            >
              {child}
            </AnimatedEffect>
          )
        )
      })}
    </CarouselWrapper>
  )
}
