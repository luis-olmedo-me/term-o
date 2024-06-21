import { theme as t } from '@src/helpers/theme.helpers'
import styled, { css } from 'styled-components'

const radius = t('radius.100')

export const inputStyles = css`
  background-color: ${t('neutral.100')};
  width: calc(100% - 25px);
  border-radius: 0 0 ${radius} 0;
  display: inline-block;
  color: ${t('neutral.1200')};
  vertical-align: middle;
`

export const InputWrapper = styled.div`
  background-color: transparent;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 1;
  border-width: 0 1px 1px;
  background-color: ${t('neutral.100')};
  border-radius: 0 0 ${radius} ${radius};
`

export const Hash = styled.span`
  width: 25px;
  display: inline-block;
  vertical-align: baseline;
  text-align: end;
  color: ${t('neutral.1200')};
`
