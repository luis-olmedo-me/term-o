import * as React from 'preact'

import Button, { buttonVariants } from '@src/components/Button'
import { Logo } from '@src/icons/Logo.component'
import * as S from './SidePanel.styles'

export const SidePanel = ({ options, selectedOptionId, onChange }) => {
  return (
    <S.SidePanelWrapper>
      <Logo />

      {options.map(option => {
        return (
          <Button
            fullWidth
            key={option.id}
            onClick={() => onChange(option.id)}
            selected={selectedOptionId == option.id}
            value={option.name}
            variant={buttonVariants.GHOST}
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
