import config from 'libs/configuration'
import styled, { keyframes } from 'styled-components'

const Birth = keyframes`
  from {
    transform: scaleX(0);
    opacity: 0;
  }

  to {
    transform: scaleX(1);
    opacity: 1;
  }
`

export const StyleSheetWrapper = styled.div`
  position: relative;
  padding: 5px 10px;
  background-color: ${config.getTheme('neutral.1200')};
  color: ${config.getTheme('neutral.200')};
  font-weight: bold;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  line-height: 1.75;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  animation-name: ${(props) => (props.shouldAnimate ? Birth : '')};
  animation-duration: 0.5s;
  transform-origin: right;
`

export const Title = styled.span`
  vertical-align: middle;
`

export const PropertyWrapper = styled.div`
  border-left: 5px solid ${config.getTheme('transparent.400')};
  padding-left: 2ch;
  display: flex;
  flex-flow: column;
  gap: 5px;
`
export const Property = styled.div`
  background-color: ${config.getTheme('neutral.1200')};
  padding: 0 7px;
  border-radius: 3px;
  cursor: pointer;
  color: ${config.getTheme('neutral.200')};
  font-weight: bold;
  width: fit-content;
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;

  opacity: ${(props) => (props.isOverwritten ? '.5' : '1')}; ;
`

export const PropertyName = styled.span`
  color: ${config.getTheme('red.600')};
`

export const Equal = styled.span`
  color: ${config.getTheme('purple.900')};
`
export const PropertyColor = styled.span`
  color: ${(props) => props.fontColor};
  border: 2px solid ${config.getTheme('transparent.300')};
  height: 14px;
  width: 14px;
  background-color: currentColor;
  margin-left: 5px;
  border-radius: 3px;
`
export const PropertyValue = styled.span`
  color: ${config.getTheme('purple.700')};
  margin-left: 5px;
`
