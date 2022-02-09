import styled from 'styled-components'

export const Log = styled.div`
  padding: 10px;

  &:first-child {
    border-radius: 10px 10px 0 0;
  }
  &:last-child {
    border-radius: 0 0 10px 10px;
  }

  &&.command {
    background-color: #454545;
    color: #d6d6d6;
  }

  &&.element {
    background-color: #777070;
    color: #d6d6d6;
  }

  &&.styles {
    background-color: #707077;
    color: #d6d6d6;
  }
`

export const Hash = styled.span`
  color: #d6d6d6;
  margin-right: 1ch;
`
