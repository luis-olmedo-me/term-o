import styled, { keyframes } from 'styled-components'

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

const birth = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`
export const AnimatedEffect = styled.div`
  transform-origin: ${(props) => props.direction};
  animation: ${birth} 0.2s ease-in-out;
`
