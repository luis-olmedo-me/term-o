import React, { useEffect, useState } from 'react'
import { styleElements } from '../../easyCommander.promises'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'

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
      styleElements({ styles: inlineStyles, elements: elementsToStyle })
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
