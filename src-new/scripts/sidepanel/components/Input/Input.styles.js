import { theme as t } from '@src/theme/theme.helpers'
import styled from 'styled-components'

export const StyledInput = styled.input`
  font-family: ${t('font.primary')};
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  font-size: ${t('font-size.100')};
  border: none;
  display: block;
  caret-color: ${t('green.50')};
  background-color: transparent;
  color: transparent;
  line-height: ${t('line-height.300')};
  padding: ${t('space.500')} ${t('space.400')};
  background-color: ${t('grey.900')};
  color: ${t('grey.50')};
  letter-spacing: ${t('space.50')};

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }

  &::selection {
    color: ${t('green.A200')};
    background-color: ${t('grey.800')};
  }
`

export const Hash = styled.span`
  width: 25px;
  display: inline-block;
  vertical-align: baseline;
  text-align: end;
  color: ${t('neutral.1200')};
`
