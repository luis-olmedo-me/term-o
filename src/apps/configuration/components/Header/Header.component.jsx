import { useState } from 'preact/hooks'

import Input, { inputTypes, inputVariants } from '@src/components/Input'
import useDebouncedCallback from '@src/hooks/useDebouncedCallback'
import Logo from '@src/icons/Logo.icon'
import Repo from '@src/icons/Repo.icon'

import { iconSizes } from '@src/constants/icon.constants'
import { content, headerLink, headerWrapper, searchInput } from './Header.module.scss'

export const Header = ({ onSearch }) => {
  const [value, setValue] = useState('')

  const handleSearch = useDebouncedCallback(onSearch, [], 200)

  const handleOnChange = event => {
    setValue(event.target.value)
    handleSearch(event)
  }

  return (
    <header className={headerWrapper}>
      <div className={content}>
        <Logo size={iconSizes.NORMAL} />

        <Input
          fullWidth
          name="config-search"
          onChange={handleOnChange}
          type={inputTypes.TEXT}
          variant={inputVariants.OUTLINED}
          placeholder="Search settings..."
          className={searchInput}
          value={value}
        />
      </div>

      <div className={content}>
        <a className={headerLink} href="https://github.com/luis-olmedo-me/term-o">
          <Repo size={iconSizes.MEDIUM} />
        </a>
      </div>
    </header>
  )
}

Header.propTypes = {
  onSearch: Function
}
