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

  &&.button-group {
    background-color: #505050;
    color: #d6d6d6;
    padding: 0;
  }

  &&.element {
    background-color: #777070;
  }

  &&.styles {
    background-color: #707077;
    color: #d6d6e7;
  }

  &&.error {
    background-color: #887070;
    color: #e7d6d6;
  }

  &&.info {
    background-color: #707088;
    color: #d6d6e7;
  }

  &&.table {
    background-color: #706090;
    color: #d6d6e7;
  }

  &&.success {
    background-color: #708888;
    color: #d6d6e7;
  }
`

export const Hash = styled.span`
  margin-right: 1ch;
`
