import * as React from 'preact'

import Button from '@src/scripts/sidepanel/components/Button'
import * as S from './SidePanel.styles'

export const SidePanel = ({ options }) => {
  return (
    <S.SidePanelWrapper>
      {options.map(option => {
        return <Button key={option.id} text={option.name} fullWidth />
      })}
    </S.SidePanelWrapper>
  )
}

SidePanel.propTypes = {
  options: Array
}
