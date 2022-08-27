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
  overflow: hidden;
  transition: height 0.4s ease-in-out, opacity 0.3s ease-in-out,
    padding 0.4s ease-in-out, transform 0.4s ease-in-out;

  height: ${(props) => (props.isDead ? '0' : '100%')};
  opacity: ${(props) => (props.isDead ? '0' : '1')};
  padding: ${(props) => (props.isDead ? '0' : '10px')};
  transform: scaleX(${(props) => (props.isDead ? '1.5' : '1')});

  &:last-child {
    margin-bottom: 0;
  }
`

export const Description = styled.p`
  margin: 0;
  color: white;
`

export const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-size: cover;
`

export const LogoWrapper = styled.svg`
  background: #ffffff20;
  border-radius: 8px;
  padding: 6px;
  max-width: 50px;
  max-height: 50px;
`
