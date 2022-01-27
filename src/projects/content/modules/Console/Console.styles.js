import styled from 'styled-components'

export const ConsoleWrapper = styled.div`
  height: 100%;
  position: relative;
  pointer-events: all;
  color: #eee;
`

export const ConsoleContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  min-width: 650px;
  background-color: #333;
  border-radius: 5px;
  box-shadow: 0px 0 40px 10px rgba(#000, 25%);
  border: 1px solid #444;
  font-family: monospace;
`

export const ConsoleTitle = styled.h1`
  padding: 10px 0;
  margin: 0;
  text-align: center;
  font-weight: normal;
  font-size: 20px;
  border-bottom: 1px solid #444;
`

export const ConsoleInput = styled.input`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  background-color: #333;
  color: #eee;
  border: none;
  border-top: 1px solid #444;
  border-radius: 0 0 5px 5px;

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }
`
export const ConsoleLogs = styled.div`
  padding: 10px;
  width: 100%;
  height: 250px;
  border: none;
  box-sizing: border-box;
  background-color: #333;
  color: #eee;
  display: block;
  overflow: hidden scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`
