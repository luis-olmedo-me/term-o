import styled from 'styled-components'

export const ClockWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #555;
  width: 200px;
  height: 200px;
`

export const CircleWrapper = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
`

export const ValueWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5em !important;
  font-weight: 500;
`
