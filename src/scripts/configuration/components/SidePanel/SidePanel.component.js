import * as React from 'preact'

import { Logo } from '@src/icons/Logo.component'
import Button from '@src/scripts/sidepanel/components/Button'
import * as S from './SidePanel.styles'

export const SidePanel = ({ options, selectedOptionId, onChange }) => {
  return (
    <S.SidePanelWrapper>
      <Logo />

      {options.map(option => {
        return (
          <Button
            key={option.id}
            text={option.name}
            selected={selectedOptionId == option.id}
            onClick={() => onChange(option.id)}
            fullWidth
          />
        )
      })}
    </S.SidePanelWrapper>
  )
}

SidePanel.propTypes = {
  options: Array,
  selectedOptionId: String,
  onChange: Function
}
