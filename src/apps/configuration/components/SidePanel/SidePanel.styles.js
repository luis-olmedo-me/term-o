import { ButtonWrapper } from '@src/components/Button'
import { theme as t } from '@src/helpers/themes.helpers'
import styled from 'styled-components'

export const SidePanelWrapper = styled.div`
  border-right: ${t('space.50')} solid ${t('colors.white')};
  min-width: 200px;

  ${ButtonWrapper} {
    justify-content: start;
  }

  svg {
    margin: 0 auto;
    display: block;
    margin-block: ${t('space.900')};
  }
`
