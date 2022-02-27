import styled from 'styled-components'

export const ConsoleWrapper = styled.div`
  position: fixed;
  z-index: 1000000;
  opacity: ${(props) => props.opacity};
  pointer-events: ${(props) => (props.opacity === 0 ? 'none' : 'all')};
  display: flex;
  flex-flow: column;
  transition: inset 0.05s ease-in-out, opacity 0.1s ease-in-out;
  min-height: 400px;
`

export const ConsoleContent = styled.div`
  background-color: #2e2e2e;
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};

  box-shadow: ${({ isMoving }) =>
    isMoving
      ? '0px 20px 15px -3px rgba(0, 0, 0, 0.5)'
      : '0px 10px 15px -3px rgba(0, 0, 0, 0.15)'};
  transform: translateY(${({ isMoving }) => (isMoving ? '-5px' : 0)});

  transition: 0.2s ease-in-out;
  transition-property: transform box-shadow;
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const ConsoleTitle = styled.h1`
  padding: 10px 0;
  margin: 0;
  text-align: center;
  font-weight: normal;
  font-size: 20px;
  border: 1px solid #505050;
  box-sizing: border-box;
  color: #d6d6d6;
  cursor: pointer;
  user-select: none;
  position: absolute;
  width: 100%;
  top: 0;
  transition: background-color 0.2s ease-in-out;

  &&:hover,
  &&:active {
    background-color: #292929;
  }
`

export const ConsoleLogs = styled.div`
  padding: 10px;
  width: 100%;
  border: none;
  box-sizing: border-box;
  background-color: #2e2e2e;
  color: #d6d6d6;
  display: block;
  overflow-y: scroll;
  border: solid #505050;
  border-width: 0 1px;
  flex: 1;

  &::-webkit-scrollbar {
    display: none;
  }
`
