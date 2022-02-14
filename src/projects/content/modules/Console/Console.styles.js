import styled from 'styled-components'

export const ConsoleWrapper = styled.div`
  height: 100%;
  position: relative;
  color: #d6d6d6;
  font-size: 14px;
  font-family: system-ui;
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
`

export const ConsoleContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  min-width: 650px;
  background-color: #2e2e2e;
  border-radius: 5px;
  box-shadow: 0px 0 40px 10px rgba(#000, 25%);
  border: 1px solid #505050;
  font-family: monospace;
`

export const ConsoleTitle = styled.h1`
  padding: 10px 0;
  margin: 0;
  text-align: center;
  font-weight: normal;
  font-size: 20px;
  border-bottom: 1px solid #505050;
`

export const ConsoleInput = styled.input`
  padding: 10px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  background-color: #2e2e2e;
  color: #d6d6d6;
  border: none;
  border-radius: 0 0 5px 5px;
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
  height: 40vh;
  border: none;
  box-sizing: border-box;
  background-color: #2e2e2e;
  color: #d6d6d6;
  display: block;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const ConsoleInputWrapper = styled.div`
  border-radius: 0 0 5px 5px;
  border-top: 1px solid #505050;
`

export const ConsoleHash = styled.span`
  width: 20px;
  display: inline-block;
  vertical-align: middle;
  text-align: end;
`
