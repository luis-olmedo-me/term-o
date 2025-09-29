import * as React from 'preact'

import Button from '@src/scripts/sidepanel/components/Button'
import * as S from './SidePanel.styles'

export const SidePanel = () => {
  return (
    <S.SidePanelWrapper>
      <Button text={'Terminal'} fullWidth />
      <Button text={'Prompt'} fullWidth />
      <Button text={'Theme'} fullWidth />
    </S.SidePanelWrapper>
  )
}
