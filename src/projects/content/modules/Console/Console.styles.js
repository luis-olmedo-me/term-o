import styled from 'styled-components'

export const ConsoleWrapper = styled.div`
  height: 100%;
  position: relative;
  pointer-events: all;
  color: #fff;
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

  .console-history {
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
  }

  .console-input {
    box-sizing: border-box;
    align-items: center;
    border-radius: 0 5px 5px 0;
    text-indent: 3ch;
  }
`

export const ConsoleTitle = styled.h1`
  padding: 10px 0;
  margin: 0;
  text-align: center;
  font-weight: normal;
  font-size: 20px;
  border-bottom: 1px solid #444;
`

export const ConsoleOptions = styled.div`
  border-top: 1px solid #444;
  padding: 0 5px;
`
