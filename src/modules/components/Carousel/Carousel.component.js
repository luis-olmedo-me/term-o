import React from 'react'
import { CarouselWrapper } from './Carousel.styles'

export const Carousel = ({ itemInView, children }) => {
  const wrapperReference = React.useRef(null)

  React.useEffect(() => {
    const childToScroll = wrapperReference.current.children[itemInView]

    if (childToScroll?.scrollIntoView) {
      childToScroll.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }, [itemInView])

  return <CarouselWrapper ref={wrapperReference}>{children}</CarouselWrapper>
}
