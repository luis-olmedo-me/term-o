import styled from 'styled-components'

export const Groups = styled.div`
  background-color: #00000022;
  display: flex;
  justify-content: center;
`

export const Action = styled.input`
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.2s ease-in-out;
  font-family: Share Tech Mono;
  color: #fff;

  &:hover {
    background-color: #00000010;
  }

  &:focus,
  &:active {
    outline: none;
  }

  &&.selected {
    background-color: #ffffff33;
  }

  &&.disabled {
    background-color: #00000033;

    &&:hover {
      background-color: #00000033;
    }
  }

  &::selection {
    background-color: #222;
    color: #f8c572;
  }
`
