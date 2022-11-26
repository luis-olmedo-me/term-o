import { theme as t } from '@src/helpers/theme.helpers'
import styled, { keyframes } from 'styled-components'

export const DefaultWrapper = styled.span`
  position: relative;
  padding-right: ${props => props.paddingRight || 7}px;
`

export const Tag = styled.span`
  color: ${t('neutral.1000')};
`

export const TagName = styled.span`
  color: ${({ isHidden }) => (isHidden ? t('neutral.800') : t('blue.700'))};
`

export const AttributeName = styled.span`
  color: ${({ isHidden }) => (isHidden ? t('neutral.1000') : t('yellow.800'))};
`

export const Equal = styled.span`
  color: ${({ isHidden }) => (isHidden ? t('neutral.900') : t('yellow.700'))};
`

export const AttributeValue = styled.span`
  color: ${({ isHidden }) => (isHidden ? t('neutral.900') : t('yellow.600'))};
`

const birth = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`
export const ChildWrapper = styled.div`
  padding-left: 2ch;
  border-left: 5px solid ${t('transparent.300')};
  animation: ${birth} 0.2s ease-in-out;
  transform-origin: top;
`
