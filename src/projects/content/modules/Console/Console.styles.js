import styled from 'styled-components'

export const ConsoleWrapper = styled.div`
  position: fixed;
  z-index: 1000000;

  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};

  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  box-shadow: ${({ isMoving }) =>
    isMoving
      ? '0px 20px 15px -3px rgba(0, 0, 0, 0.5)'
      : '0px 10px 15px -3px rgba(0, 0, 0, 0.15)'};

  transition: inset 0.05s ease-in-out, opacity 0.1s ease-in-out;
  min-height: 400px;
  display: flex;
  flex-flow: column;
`

export const ConsoleTitle = styled.h1`
  padding: 10px 0;
  margin: 0;
  text-align: center;
  font-weight: normal;
  font-size: 20px;
  border: 1px solid #333;
  box-sizing: border-box;
  background-color: #111;
  color: #d6d6d6;
  cursor: pointer;
  user-select: none;
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 1;
  transition: background-color 0.2s ease-in-out;

  &&:hover,
  &&:active {
    background-color: #0d0d0d;
  }
`

export const ConsoleLogs = styled.div`
  padding: 10px;
  width: 100%;
  border: none;
  box-sizing: border-box;
  background-color: #111;
  color: #d6d6d6;
  display: block;
  overflow-y: scroll;
  border: solid #333;
  border-width: 0 1px;
  flex: 1;

  &::-webkit-scrollbar {
    display: none;
  }
`
