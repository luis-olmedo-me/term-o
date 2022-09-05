import styled from 'styled-components'

export const ActionButtons = styled.div`
  display: inline-block;
  height: 100%;
  position: sticky;
  border-radius: 0 3px 3px 0;
  border-left: 1px solid #00000015;
  background-color: var(--tag-background-color);
  transition: background-color 0.2s ease-in-out;
`
export const ActionButton = styled.button`
  height: 100%;
  background-color: transparent;
  border: none;
  color: black;
  font-weight: bold;
  font-family: Coda;
  padding: 0 10px;
  cursor: pointer;
  border-right: 1px solid #00000015;

  &&:last-child {
    border-radius: 0 3px 3px 0;
    border-right: 0;
  }
  &&:disabled {
    background-color: #00000015;
    color: #aaa;
  }
  &:hover {
    background-color: #ffffff15;
  }
`

export const ItemsWrapper = styled.div`
  display: inline-block;
  height: 100%;

  &&:first-child {
    border-right: 1px solid #00000015;
  }
`
