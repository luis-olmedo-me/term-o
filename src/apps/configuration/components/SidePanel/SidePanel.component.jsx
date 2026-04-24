import Button, { buttonVariants } from '@src/components/Button'

import { buttonSizes } from '@src/components/Button/Button.constants'
import { sidepanel, sidepanel__button, sidepanel__title } from './SidePanel.module.scss'

export const SidePanel = ({ options, selectedOptionId, onChange }) => {
  return (
    <aside className={sidepanel}>
      <h2 className={sidepanel__title}>Configuration</h2>

      {options.map(option => {
        return (
          <Button
            Icon={option.Icon}
            key={option.id}
            onClick={() => onChange(option.id)}
            selected={selectedOptionId == option.id}
            value={option.name}
            variant={buttonVariants.GHOST}
            size={buttonSizes.LARGE}
            className={sidepanel__button}
          />
        )
      })}
    </aside>
  )
}

SidePanel.propTypes = {
  options: Array,
  selectedOptionId: String,
  onChange: Function
}
