import styled from 'styled-components'

export const Wrapper = styled.span`
  display: inline-block;
  position: relative;
  overflow: hidden;
  padding: 5px 10px;
  text-align: center;
  transition: background-color 0.2s ease-in-out;

  &&:hover {
    background-color: #ffffff66;
  }

  &:focus,
  &:active {
    outline: none;
    background-color: #ffffff55;
  }

  &&.selected {
    background-color: #ffffff55;
  }

  &&.disabled {
    background-color: #00000033;

    &&:hover {
      background-color: #00000033;
    }
  }

  &&.invalid {
    background-color: #f21361;
    text-decoration: line-through;
  }

  &::selection {
    background-color: #222;
    color: #f8c572;
  }
`

export const DatePicker = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  box-sizing: border-box;

  &::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
`
