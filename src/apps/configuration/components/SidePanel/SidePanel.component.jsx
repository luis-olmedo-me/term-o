import * as React from 'preact'

import Button, { buttonVariants } from '@src/components/Button'
import { sidePanelWrapper } from './SidePanel.module.scss'

export const SidePanel = ({ options, selectedOptionId, onChange }) => {
  return (
    <div className={sidePanelWrapper}>
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
    </div>
  )
}

SidePanel.propTypes = {
  options: Array,
  selectedOptionId: String,
  onChange: Function
}
