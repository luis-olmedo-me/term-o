import React, { useEffect, useState, useCallback } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { styleElements, validateStyles } from '../../commander.promises'
import { getParamsByType } from '../../commander.helpers'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import {
  getActionType,
  getStylesFrom,
  parseManualStyles,
  parseStyles
} from './CommandCss.helpers'
import { cssMessages } from './CommandCss.messages'
import { StyleSheet } from '../../modules/ParameterElements/components/StyleSheet/StyleSheet.component'
import { ParameterElements } from '../../modules/ParameterElements/ParameterElements.component'
import { Carousel } from 'modules/components/Carousel/Carousel.component'
import { CarouselItem } from 'modules/components/Carousel/Carousel.styles'
import { usePaginationGroups } from 'modules/components/Table/hooks/usePaginationGroups.hook'
import { cssActionTypes } from './CommandCss.constants'

export const CommandCss = ({
  props,
  terminal: { command, params, setMessageData }
}) => {
  const { styles, manualStyles } = props

  const [stylesApplied, setStylesApplied] = useState([])

  const actionType = getActionType(props)

  const { buttonGroups, pages, pageNumber } = usePaginationGroups({
    items: stylesApplied,
    maxItems: 10
  })

  const handleApplyStyles = useCallback(
    (customStyles = {}) => {
      const inlineStyles = {
        ...parseStyles(styles),
        ...parseManualStyles(manualStyles),
        ...customStyles
      }

      const paramElements = getParamsByType(parameterTypes.ELEMENTS, params)

      const { validStyles, invalidStyles } = validateStyles(inlineStyles)

      const invalidStylesNames = Object.keys(invalidStyles)
      const hasInvalidatedStyles = invalidStylesNames.length > 0

      if (hasInvalidatedStyles) {
        return setMessageData(cssMessages.invalidStyle, {
          invalidStyleNames: invalidStylesNames.join(', ')
        })
      }

      styleElements({ styles: validStyles, elements: paramElements })
      setStylesApplied([{ title: 'Styles', styles: validStyles }])
    },
    [styles, manualStyles, setMessageData]
  )

  const handleGetStyles = useCallback(() => {
    const paramElements = getParamsByType(parameterTypes.ELEMENTS, params)

    if (paramElements.length > 1) return console.log('have many')
    if (paramElements.length === 0) return console.log('have nothing')

    const [firstParamElement] = paramElements
    const newStylesApplied = getStylesFrom(firstParamElement)

    setStylesApplied(newStylesApplied)
  }, [])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case cssActionTypes.SET_STYLES:
          handleApplyStyles()
          break

        case cssActionTypes.GET_STYLES:
          handleGetStyles()
          break

        default:
          break
      }
    },
    [actionType, handleApplyStyles, handleGetStyles]
  )

  const hasPages = pages.length > 0

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.STYLES} buttonGroups={buttonGroups}>
        {hasPages && (
          <Carousel itemInView={pageNumber}>
            {pages.map((page, currentPageNumber) => {
              return (
                <CarouselItem key={currentPageNumber}>
                  <ParameterElements
                    elements={page}
                    pinnedElements={[]}
                    Child={StyleSheet}
                  />
                </CarouselItem>
              )
            })}
          </Carousel>
        )}
      </LogWrapper>
    </>
  )
}
