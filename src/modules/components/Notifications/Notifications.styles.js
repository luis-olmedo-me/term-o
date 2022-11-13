import { theme as t } from 'src/helpers/theme.helpers'
import styled from 'styled-components'

export const NotificationsWrapper = styled.div`
  position: fixed;
  z-index: 1000004;
  left: 10px;
  top: 10px;
  width: 400px;
  font-family: Share Tech Mono;
  font-size: 1em;
`

export const NotificationWrapper = styled.div`
  background-color: ${t('neutral.100')};
  box-shadow: 0 0 15px 5px ${t('transparent.300')};
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  gap: 24px;
  border-radius: ${t('radius.100')};
  align-items: center;
  box-sizing: content-box;
  overflow: hidden;
  transition: height 0.4s ease-in-out, opacity 0.3s ease-in-out, padding 0.4s ease-in-out,
    transform 0.4s ease-in-out;

  height: ${props => (props.isDead ? '0' : '100%')};
  opacity: ${props => (props.isDead ? '0' : '1')};
  padding: ${props => (props.isDead ? '0' : '10px')};
  transform: scaleX(${props => (props.isDead ? '1.5' : '1')});

  &:last-child {
    margin-bottom: 0;
  }
`

export const Description = styled.p`
  margin: 0;
  color: white;
`

export const Image = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 8px;
  background-size: cover;
`

export const LogoWrapper = styled.svg`
  background-color: ${t('transparent.350')};
  border-radius: 8px;
  padding: 6px;
  max-width: 35px;
  max-height: 35px;
`
