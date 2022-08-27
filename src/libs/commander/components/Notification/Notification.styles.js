import styled from 'styled-components'

export const NotificationWrapper = styled.div`
  all: initial;
  position: fixed;
  z-index: 1000004;
  background-color: #111;
  left: 10px;
  top: 10px;
  width: 400px;
  border-radius: 3px;
  font-family: Coda;
  box-shadow: 0 0 15px 5px #0000002a;
  padding: 10px;
  font-size: 1em;
  display: flex;
  gap: 24px;
  align-items: center;
  box-sizing: content-box;
`

export const Metadata = styled.p`
  width: 70%;
`
