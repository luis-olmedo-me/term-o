import React from 'react'
import { CarouselWrapper } from './Carousel.styles'

export const Carousel = ({ itemInView, children }) => {
  const wrapperReference = React.useRef(null)

  React.useEffect(() => {
    wrapperReference.current.scrollBy({
      left: wrapperReference.current.clientWidth,
      behavior: 'smooth'
    })
  }, [itemInView])

  return <CarouselWrapper ref={wrapperReference}>{children}</CarouselWrapper>
}
