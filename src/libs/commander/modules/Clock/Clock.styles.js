import config from 'libs/configuration'
import styled from 'styled-components'

export const ClockWrapper = styled.div`
  position: relative;
  width: 50%;
  margin: auto;
`

export const ProgressBar = styled.div`
  height: 40px;
  border-radius: 3px;
  background-color: ${config.getTheme('purple.100')};
`
export const Progress = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  height: 40px;
  transition: height 0.2s ease-in-out;
  border-radius: 3px;
  background-color: ${config.getTheme('purple.900')};
  height: ${(props) => props.porcentage}%;
`

export const ValueWrapper = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  vertical-align: middle;
  color: ${config.getTheme('neutral.1200')};
`
