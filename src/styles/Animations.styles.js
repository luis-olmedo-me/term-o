import { keyframes } from 'styled-components'

export const slide = keyframes`
  from {
    left: 0;
    opacity: 0;
  }

  40%{
    opacity: 1;
  }
  60%{
    opacity: 1;
  }

  to {
    left: 95%;
    opacity: 0;
  }
`
