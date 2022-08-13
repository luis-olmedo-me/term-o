import styled from 'styled-components'

export const Log = styled.div`
  &:first-child {
    border-radius: 3px 3px 0 0;
  }
  &:last-child {
    border-radius: 0 0 3px 3px;
  }

  &&.command {
    background-color: #222;
    color: #fff;
  }

  &&.button-group {
    background-color: #2a2a2a;
    color: #fff;
    padding: 0;
  }

  &&.element {
    background-color: #ff4ecd;
  }

  &&.styles {
    background-color: #0056d0;
    color: #fff;
  }

  &&.error {
    background-color: #f21361;
    color: #fff;
  }

  &&.info {
    background-color: #0070f3;
    color: #fff;
  }

  &&.table {
    background-color: #7928ca;
    color: #fff;
  }

  &&.success {
    background-color: #17c964;
    color: #fff;
  }

  &&.help {
    background: linear-gradient(
      112deg,
      #06b7db -63.59%,
      #ff4ecd -20.3%,
      #0072f5 70.46%
    );
    color: #fff;
  }
`

export const Hash = styled.span`
  margin-right: 1ch;
`

export const LogContent = styled.div`
  padding: 10px;
`

export const GroupButtons = styled.div`
  background-color: #00000022;
  display: flex;
  justify-content: center;
`

export const GroupButton = styled.button`
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.2s ease-in-out;
  font-family: Coda;
  color: #fff;
  border-width: 0 0 0 1px;

  &&.selected {
    background-color: #ffffff55;
  }

  &&.disabled {
    background-color: #00000033;
  }
`
