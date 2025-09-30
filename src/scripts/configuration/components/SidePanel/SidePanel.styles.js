import { theme as t } from '@src/libs/themer'
import { ButtonWrapper } from '@src/scripts/sidepanel/components/Button'
import styled from 'styled-components'

export const SidePanelWrapper = styled.div`
  border-right: ${t('space.50')} solid ${t('colors.brightBlack')};
  padding-right: ${t('space.600')};
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
