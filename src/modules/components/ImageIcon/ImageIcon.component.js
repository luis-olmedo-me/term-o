import { Logo } from '@src/modules/icons'
import * as React from 'preact'
import { useState } from 'preact/hooks'
import { Favicon, FaviconSVG, IconWrapper, LabelWrapper } from './ImageIcon.styles'

export const ImageIcon = ({ url, label }) => {
  const [hasError, setHasError] = useState(false)

  return (
    <IconWrapper>
      {hasError ? (
        <Logo size={28} Wrapper={FaviconSVG} />
      ) : (
        <Favicon src={url} onError={() => setHasError(true)} />
      )}

      <LabelWrapper>{label}</LabelWrapper>
    </IconWrapper>
  )
}
