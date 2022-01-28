import styled from 'styled-components'

export const ElementWrapper = styled.span`
  padding: 2px 10px;
  background-color: ${(props) => (props.isHidden ? '#DF4168' : '#FF6188')};
  color: #d6d6d6;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.isHidden ? '#EF5178' : '#FF7198')};
  }
`
