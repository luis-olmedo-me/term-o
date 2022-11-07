import styled from 'styled-components'

export const LogWrapper = styled.div`
  transition: color 0.4s ease-in-out, background-color 0.4s ease-in-out;
  cursor: auto;
  width: 100%;

  &:first-child {
    border-radius: 3px 3px 0 0;
  }
  &:last-child {
    border-radius: 0 0 3px 3px;
  }

  &&.command {
    background-color: #222;
    color: #fff;
  }

  &&.element {
    background-color: #ff4ecd;
    color: #fff;
  }

  &&.styles {
    background-color: #0056d0;
    color: #fff;
  }

  &&.error {
    background-color: #f21361;
    color: #fff;
  }

  &&.info {
    background-color: #0070f3;
    color: #fff;
  }

  &&.table {
    background-color: #7928ca;
    color: #fff;
  }

  &&.success {
    background-color: #17c964;
    color: #fff;
  }

  &&.tabs {
    background-color: #06b7db;
    color: #fff;
  }

  &&.help {
    background-color: #a66908;
    color: #fff;
  }
`

export const Hash = styled.span`
  margin-right: 1ch;
  min-width: 1em;
  display: inline-block;
  text-align: center;

  & + span {
    vertical-align: middle;
  }
`

export const LogContent = styled.div`
  padding: 10px;
  word-break: break-all;
`
export const Shadow = styled.div`
  &.shadow {
    padding: 10px;
    background-color: #00000015;
  }
`

export const ScrolledLogContent = styled.div`
  max-height: 500px;
  overflow-y: scroll;
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    display: none;
  }
`
