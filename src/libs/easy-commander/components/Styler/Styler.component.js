import React, { useEffect, useState } from 'react'
import { parameterTypes } from '../../easyCommander.constants'
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

export const Styler = ({ id, styles, command, parameters }) => {
  const inlineStyles = parseStyles(styles)

  const hasDefaultElements = parameters?.type === parameterTypes.ELEMENTS
  const elementsToStyle = hasDefaultElements ? parameters.value : []

  useEffect(
    function applyStyles() {
      styleElements({ styles: inlineStyles, elements: elementsToStyle })
    },
    [parameters]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.STYLES}>
        {JSON.stringify(inlineStyles, null, 1)}
      </LogWrapper>
    </>
  )
}
