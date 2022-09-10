import styled from 'styled-components'

export const ConsoleWrapper = styled.div`
  all: initial;
  position: fixed;
  z-index: 1000000;
  font-family: 'Coda', monospace;

  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: scale(${({ isOpen }) => (isOpen ? '1' : '0')});

  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  box-shadow: ${({ isMoving }) =>
    isMoving
      ? '0px 20px 15px -3px rgba(0, 0, 0, 0.5)'
      : '0px 10px 15px -3px rgba(0, 0, 0, 0.15)'};

  transition: inset 0.05s ease-in-out, opacity 0.2s ease-in-out,
    transform 0.2s ease-in-out;
  min-height: 400px;
  display: flex;
  flex-flow: column;
  font-size: 16px;
`

export const ConsoleTitle = styled.h1`
  padding: 5px 0 2px;
  margin: 0;
  text-align: center;
  font-weight: normal;
  font-size: 25px;
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
  border-radius: 5px 5px 0 0;
  cursor: grab;

  &&:hover,
  &&:active {
    background-color: #0d0d0d;
  }

  &&:active {
    cursor: grabbing;
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
  border-width: 0 1px;
  flex: 1;
  border-radius: 5px;
  cursor: text;

  &::-webkit-scrollbar {
    display: none;
  }
`
