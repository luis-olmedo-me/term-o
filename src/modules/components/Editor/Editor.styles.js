import { theme as t } from '@src/helpers/theme.helpers'
import styled from 'styled-components'

export const EditableArea = styled.div`
  min-height: 300px;
  background-color: ${t('transparent.500')};
  border-radius: ${t('radius.200')};
  padding: 10px;
  line-height: 2em;

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }
`
