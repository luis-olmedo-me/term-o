import styled from 'styled-components'

export const ConsoleContent = styled.div`
  background-color: #2e2e2e;
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};

  box-shadow: ${({ isMoving }) =>
    isMoving
      ? '0px 20px 15px -3px rgba(0, 0, 0, 0.5)'
      : '0px 10px 15px -3px rgba(0, 0, 0, 0.15)'};
  transform: translateY(${({ isMoving }) => (isMoving ? '-5px' : 0)});

  transition: 0.2s ease-in-out;
  transition-property: transform box-shadow opacity;
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
`

export const ConsoleInput = styled.input`
  padding: 10px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  background-color: #2e2e2e;
  color: #d6d6d6;
  border: none;
  vertical-align: middle;

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
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

  &::-webkit-scrollbar {
    display: none;
  }
`

export const ConsoleInputWrapper = styled.div`
  box-sizing: border-box;
  border: 1px solid #505050;
`

export const ConsoleHash = styled.span`
  width: 20px;
  display: inline-block;
  vertical-align: middle;
  text-align: end;
  color: #d6d6d6;
`
