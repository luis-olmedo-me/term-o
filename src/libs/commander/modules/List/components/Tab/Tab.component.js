import React, { useState } from 'react'
import { Favicon, FaviconSVG, TabWrapper, Title } from './Tab.styles'
import { Logo } from 'src/modules/icons/Logo.icon'

export const Tab = ({ element = {} }) => {
  const [hasError, setHasError] = useState(false)

  return (
    <TabWrapper>
      {hasError ? (
        <Logo size={28} Wrapper={FaviconSVG} />
      ) : (
        <Favicon src={element.favIconUrl} onError={() => setHasError(true)} />
      )}

      <Title>{element.title}</Title>
    </TabWrapper>
  )
}
