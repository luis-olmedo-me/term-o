import styled, { keyframes } from 'styled-components'
import {
  SelectDefaultOption,
  DefaultTrigger,
  SelectDefaultOptionsWrapper
} from 'modules/components/Select/Select.styles'
import { Select } from 'modules/components/Select/Select.component'

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
  padding: 5px 2em 5px 10px;
  background-color: #fafafa;
  font-weight: bold;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  line-height: 1.75;
  padding-right: ${(props) => props.paddingRight}px;
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

export const ThreeDotsOptions = styled(Select)`
  position: absolute;
  top: 0;
  right: 0;
  height: -webkit-fill-available;
`
export const SelectOptionsWrapper = styled(SelectDefaultOptionsWrapper)`
  && {
    scrollbar-color: #dd44b2 #ffffff;
  }

  &&::-webkit-scrollbar-thumb {
    background-color: #dd44b2;
  }
`
export const SelectTrigger = styled(DefaultTrigger)`
  border-left: 1px solid #eaeaea;
  border-radius: 0 3px 3px 0;
  font-weight: bold;

  &:hover {
    background-color: #ffdbe7;
    border-color: transparent;
  }
`
export const SelectOption = styled(SelectDefaultOption)`
  &:hover {
    background-color: #ff4ecd;
    color: #fafafa;
  }
`
