import styled from 'styled-components'

export const NotificationsWrapper = styled.div`
  all: initial;
  position: fixed;
  z-index: 1000004;
  left: 10px;
  top: 10px;
  width: 400px;
  font-family: Coda;
  font-size: 1em;
`

export const NotificationWrapper = styled.div`
  margin-bottom: 10px;
  box-shadow: 0 0 15px 5px #0000002a;
  background-color: #111;
  padding: 10px;
  display: flex;
  gap: 24px;
  border-radius: 3px;
  align-items: center;
  box-sizing: content-box;

  &:last-child {
    margin-bottom: 0;
  }
`

export const Description = styled.p`
  margin: 0;
`

export const LogoWrapper = styled.svg`
  background: #ffffff20;
  border-radius: 8px;
  padding: 6px;
`
