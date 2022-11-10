import config from 'libs/configuration'
import styled, { keyframes } from 'styled-components'

const Birth = keyframes`
  from {
    transform: scaleX(0);
    opacity: 0;
  }

  to {
    transform: scaleX(1);
    opacity: 1;
  }
`

export const ElementWrapper = styled.span`
  position: relative;
  padding: 5px 7px;
  background-color: ${config.getTheme('neutral.1200')};
  border-radius: ${config.getTheme('border.200')};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  line-height: 1.75;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  animation-name: ${(props) => (props.shouldAnimate ? Birth : '')};
  animation-duration: 0.5s;
  transform-origin: right;

  &&.pinned {
    border-left: 10px solid ${config.getTheme('yellow.800')};
    background-color: ${config.getTheme('yellow.900')};

    && button {
      background-color: transparent;
      border-left: 1px solid ${config.getTheme('transparent.200')};

      &:hover {
        background-color: ${config.getTheme('transparent.250')};
      }
    }
  }
`
