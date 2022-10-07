import styled, { keyframes } from 'styled-components'
import { Loader } from 'modules/icons/loader.icon'

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

  &&.button-group {
    background-color: #2a2a2a;
    color: #fff;
    padding: 0;
  }

  &&.element {
    background-color: #ff4ecd;
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
`

export const LogContent = styled.div`
  padding: 10px;
  word-break: break-all;
`
export const ScrolledLogContent = styled.div`
  max-height: 537px;
  overflow-y: scroll;
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const ActionGroups = styled.div`
  background-color: #00000022;
  display: flex;
  justify-content: center;
`

export const Action = styled.input`
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.2s ease-in-out;
  font-family: Share Tech Mono;
  color: #fff;
  border-width: 0 0 0 1px;

  &&.selected {
    background-color: #ffffff55;
  }

  &&.disabled {
    background-color: #00000033;
  }
`

const Loading = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const AnimatedLoader = styled(Loader)`
  animation: ${Loading} 1.5s linear infinite;
  animation-timing-function: ease-in-out;
  color: white;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-right: 1ch;
`
export const LoaderText = styled.span`
  color: white;
  vertical-align: middle;
`
