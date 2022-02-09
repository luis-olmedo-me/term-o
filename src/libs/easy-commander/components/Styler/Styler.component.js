import React, { useEffect, useState } from 'react'
import { Element } from '../Element/Element.component'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { ElementsWrapper, MoreContentButton } from './Styler.styles'

function parseStyles(inlineStyles) {
  const regex = /([\w-]*)\s*:\s*([^;]*)/g
  var match,
    properties = {}

  while ((match = regex.exec(inlineStyles))) {
    properties[match[1]] = match[2].trim()
  }

  return properties
}

export const Styler = ({
  id,
  styles,
  values,
  command,
  carriedValue,
  setCarriedValue
}) => {
  const inlineStyles = parseStyles(styles)
  const elementsToStyle =
    carriedValue?.type === 'elements' ? carriedValue.value : []

  useEffect(
    function applyStyles() {
      elementsToStyle.forEach((element) => {
        Object.entries(inlineStyles).forEach(([key, value]) => {
          element.style[key] = value
        })
      })
    },
    [carriedValue]
  )

  return (
    <>
      <LogWrapper variant='command'>{command}</LogWrapper>

      <LogWrapper variant='styles'>
        {JSON.stringify(inlineStyles, null, 1)}
      </LogWrapper>
    </>
  )
}
