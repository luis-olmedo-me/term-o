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
  animation-name: ${Birth};
  animation-duration: 0.5s;
  transform-origin: right;
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
  background-color: #fafafa;
  border-radius: 6px;
  box-sizing: border-box;
`

export const Title = styled.span`
  vertical-align: top;
  line-height: 1.4em;
  position: relative;
  color: #333;
  font-size: 0.9em;

  &:before {
    content: '${(props) => props.secondLine}';
    position: absolute;
    bottom: -105%;
    color: #00000080;
    font-size: 0.8em;
  }
`

export const HostName = styled.span`
  vertical-align: top;
  line-height: 1.4em;
  margin-left: 10px;
  color: #00000080;
  font-size: 0.9em;
`
