import styled from 'styled-components'

export const IconWrapper = styled.span`
  display: inline-block;
  width: 100%;
`

export const Favicon = styled.img`
  display: inline-block;
  vertical-align: top;
  background-size: cover;
  width: 2em;
  height: 2em;
  padding: 5px;
  border-radius: 0;
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
  background-color: #00000030;
  border-radius: 6px;
  box-sizing: border-box;
  width: calc(100% - 2em);
`

export const LabelWrapper = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: calc(100% - 2em);
  display: inline-block;
  font-size: 1em;
  vertical-align: middle;
`
