import Button, { buttonVariants } from '@src/components/Button'

import { sidepanel, sidepanel__title } from './SidePanel.module.scss'

export const SidePanel = ({ options, selectedOptionId, onChange }) => {
  return (
    <aside className={sidepanel}>
      <h1 className={sidepanel__title}>Configuration</h1>

      {options.map(option => {
        return (
          <Button
            Icon={option.Icon}
            key={option.id}
            onClick={() => onChange(option.id)}
            selected={selectedOptionId == option.id}
            value={option.name}
            variant={buttonVariants.GHOST}
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
