import * as React from 'preact'

import Button, { buttonVariants } from '@src/components/Button'
import { iconSizes } from '@src/constants/icon.constants'
import Logo from '@src/icons/Logo.icon'
import * as S from './SidePanel.styles'

export const SidePanel = ({ options, selectedOptionId, onChange }) => {
  return (
    <S.SidePanelWrapper>
      <S.IconWrapper>
        <Logo size={iconSizes.LARGE} />
      </S.IconWrapper>

      {options.map(option => {
        return (
          <Button
            fullWidth
            Icon={option.Icon}
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
