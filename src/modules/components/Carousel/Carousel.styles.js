import styled from 'styled-components'

export const CarouselWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  scroll-snap-type: x mandatory;
  white-space: nowrap;
`

export const CarouselItem = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  scroll-snap-align: center;
`
