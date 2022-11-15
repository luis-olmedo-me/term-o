import { theme as t } from '@src/helpers/theme.helpers'
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
  background-color: ${t('neutral.1200')};
  color: ${t('neutral.200')};
  font-weight: bold;
  border-radius: ${t('radius.200')};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  line-height: 1.75;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  animation-name: ${props => (props.shouldAnimate ? Birth : '')};
  animation-duration: 0.5s;
  transform-origin: right;
`

export const Title = styled.span`
  vertical-align: middle;
`

export const PropertyWrapper = styled.div`
  border-left: 5px solid ${t('transparent.400')};
  padding-left: 2ch;
  display: flex;
  flex-flow: column;
  gap: 5px;
`
export const Property = styled.div`
  background-color: ${t('neutral.1200')};
  padding: 0 7px;
  border-radius: ${t('radius.200')};
  cursor: pointer;
  color: ${t('neutral.200')};
  font-weight: bold;
  width: fit-content;
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;

  opacity: ${props => (props.isOverwritten ? '.5' : '1')};
`

export const PropertyName = styled.span`
  color: ${t('red.600')};
`

export const Equal = styled.span`
  color: ${t('purple.900')};
`
export const PropertyColor = styled.span`
  color: ${props => props.fontColor};
  border: 2px solid ${t('transparent.300')};
  height: 14px;
  width: 14px;
  background-color: currentColor;
  margin-left: 5px;
  border-radius: ${t('radius.200')};
`
export const PropertyValue = styled.span`
  color: ${t('purple.700')};
  margin-left: 5px;
`
