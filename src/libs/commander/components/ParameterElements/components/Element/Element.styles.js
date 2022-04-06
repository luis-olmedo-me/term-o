import styled from 'styled-components'

export const ElementWrapper = styled.span`
  position: relative;
  padding: 5px 2em 5px 10px;
  background-color: ${(props) => (props.isHidden ? '#eaeaea' : '#fafafa')};
  color: ${(props) => (props.isHidden ? '#888' : '#0070f3')};
  font-weight: bold;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  flex: auto;
  text-align: center;
  line-height: 1.75;
`

export const Specification = styled.span`
  color: ${(props) => (props.isHidden ? '#888' : '#f5a623')};
`

export const ThreeDotsOptionsWrapper = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  height: -webkit-fill-available;
`

export const triggerButtonStyles = `
  border-left: 1px solid #eaeaea;
  border-radius: 0 3px 3px 0;
  font-weight: bold;

  &:hover {
    background-color: #ffdbe7;
    border-color: transparent;
  }
`

export const selectOptionStyles = `
  &:hover {
    background-color: #ff4ecd;
    color: #fafafa;
  }
`
