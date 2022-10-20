import * as React from 'react'
import { Logo } from 'src/modules/icons/Logo.icon'
import { Favicon, FaviconSVG, IconWrapper } from './ImageIcon.styles'

export const ImageIcon = ({ url, label }) => {
  const [hasError, setHasError] = React.useState(false)

  return (
    <IconWrapper>
      {hasError ? (
        <Logo size={28} Wrapper={FaviconSVG} />
      ) : (
        <Favicon src={url} onError={() => setHasError(true)} />
      )}

      <span>{label}</span>
    </IconWrapper>
  )
}
