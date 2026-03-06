import Button, { buttonVariants } from '@src/components/Button'

import { headerTitle, sidePanelWrapper } from './SidePanel.module.scss'

export const SidePanel = ({ options, selectedOptionId, onChange }) => {
  return (
    <div className={sidePanelWrapper}>
      <h1 className={headerTitle}>Configuration</h1>

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
