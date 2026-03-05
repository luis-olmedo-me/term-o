import Input, { inputTypes, inputVariants } from '@src/components/Input'
import Logo from '@src/icons/Logo.icon'

import { iconSizes } from '@src/constants/icon.constants'
import { headerWrapper, searchInput } from './Header.module.scss'

export const Header = () => {
  return (
    <header className={headerWrapper}>
      <Logo size={iconSizes.NORMAL} />

      <Input
        fullWidth
        name="config-search"
        onChange={({ target }) => console.log(target.value)}
        type={inputTypes.TEXT}
        variant={inputVariants.OUTLINED}
        placeholder="Search settings..."
        className={searchInput}
      />
    </header>
  )
}

Header.propTypes = {}
