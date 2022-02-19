import styled from 'styled-components'

export const ConsoleContent = styled.div`
  width: 70vw;
  min-width: 650px;
  background-color: #2e2e2e;
  border-radius: 5px;
  box-shadow: 0px 0 40px 10px rgba(#000, 25%);
  border: 1px solid #505050;
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

export const ConsoleInput = styled.input`
  padding: 10px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  color: #d6d6d6;
  border: none;
  vertical-align: middle;
  background-color: #2e2e2e;

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
  flex: 1;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const ConsoleInputWrapper = styled.div`
  box-sizing: border-box;
  border: 1px solid #505050;
  background-color: #2e2e2e;
  position: absolute;
  width: 100%;
  bottom: 0;
`

export const ConsoleHash = styled.span`
  width: 20px;
  display: inline-block;
  vertical-align: middle;
  text-align: end;
  color: #d6d6d6;
`
