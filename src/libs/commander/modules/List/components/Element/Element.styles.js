import styled, { keyframes } from 'styled-components'
import { Actions } from 'src/modules/components/Actions'

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
  padding: 5px 0 5px 7px;
  background-color: #fafafa;
  font-weight: bold;
  border-radius: 3px;
  cursor: pointer;
  padding-right: ${(props) => props.paddingRight}px;
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
    border-left: 10px solid #f8c572;
    background-color: #ffeecc;

    && button {
      background-color: transparent;
      border-left: 1px solid #00000015;

      &:hover {
        background-color: #ffffff15;
      }
    }
  }
`

export const FloatingActions = styled(Actions)`
  position: absolute;
`
