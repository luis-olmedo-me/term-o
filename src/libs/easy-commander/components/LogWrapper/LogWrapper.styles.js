import styled from 'styled-components'

export const Log = styled.div`
  padding: 10px;
  border-radius: 10px;

  &&.command {
    background-color: #a9dc76;
    color: #2e2e2e;

    &:first-child {
      border-radius: 10px 10px 0 0;
    }
    &:last-child {
      border-radius: 0 0 10px 10px;
    }
  }

  &&.element {
    background-color: #ff2e62;
    color: #2e2e2e;

    &:first-child {
      border-radius: 10px 10px 0 0;
    }
    &:last-child {
      border-radius: 0 0 10px 10px;
    }
  }
`

export const Hash = styled.span`
  color: #2e2e2e;
  margin-right: 1ch;
`
