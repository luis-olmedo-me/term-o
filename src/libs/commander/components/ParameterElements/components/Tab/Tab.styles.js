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

export const TabWrapper = styled.span`
  position: relative;
  padding: 5px 10px;
  background-color: #fafafa;
  color: #16181a;
  font-weight: bold;
  border-radius: 3px;
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
    border-left: 10px solid #fcd57a;
    background-color: #fee7a6;

    && button {
      background-color: #fee7a6;
      border-left: 1px solid #eed99d;

      &:hover {
        background-color: #fce6c7;
      }
    }
  }
`

export const Favicon = styled.img`
  display: inline-block;
  vertical-align: middle;
  background-size: cover;
  width: 28px;
  height: 28px;
  margin-right: 10px;
  padding: 5px;
  background-color: #00000020;
  border-radius: 6px;
  box-sizing: border-box;
`
export const FaviconSVG = styled.svg`
  display: inline-block;
  vertical-align: middle;
  background-size: cover;
  width: 28px;
  height: 28px;
  margin-right: 10px;
  padding: 5px;
  background-color: #00000035;
  border-radius: 6px;
  box-sizing: border-box;
`

export const Title = styled.span`
  vertical-align: middle;
`
