import { useState } from 'preact/hooks'

import Input, { inputTypes, inputVariants } from '@src/components/Input'
import useDebouncedCallback from '@src/hooks/useDebouncedCallback'
import Logo from '@src/icons/Logo.icon'
import Repo from '@src/icons/Repo.icon'

import { iconSizes } from '@src/constants/icon.constants'
import { header, header__content, header__link, header__search } from './Header.module.scss'

export const Header = ({ onSearch }) => {
  const [value, setValue] = useState('')

  const handleSearch = useDebouncedCallback(onSearch, [], 200)

  const handleOnChange = event => {
    setValue(event.target.value)
    handleSearch(event)
  }

  return (
    <header className={header}>
      <div className={header__content}>
        <Logo size={iconSizes.NORMAL} />

        <Input
          fullWidth
          name="config-search"
          onChange={handleOnChange}
          type={inputTypes.TEXT}
          variant={inputVariants.OUTLINED}
          placeholder="Search settings..."
          className={header__search}
          value={value}
        />
      </div>

      <div className={header__content}>
        <a className={header__link} href="https://github.com/luis-olmedo-me/term-o">
          <Repo size={iconSizes.MEDIUM} />
        </a>
      </div>
    </header>
  )
}

Header.propTypes = {
  onSearch: Function
}
