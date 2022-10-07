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
  border-width: 0 0 0 1px;

  &&.selected {
    background-color: #ffffff55;
  }

  &&.disabled {
    background-color: #00000033;
  }
`
