import React from 'react'
import { isValidColor } from './StyleSheet.helpers'
import {
  Equal,
  Property,
  PropertyColor,
  PropertyName,
  PropertyValue,
  PropertyWrapper,
  StyleSheetWrapper,
  Title
} from './StyleSheet.styles'

export const StyleSheet = ({ element = {}, className = '', styleSheets }) => {
  const indexOfCurrentStyleSheet = styleSheets.indexOf(element)
  const styleSheetsAbove = styleSheets.slice(0, indexOfCurrentStyleSheet)

  return (
    <>
      <StyleSheetWrapper className={className}>
        <Title>{element.title}</Title>
      </StyleSheetWrapper>

      <PropertyWrapper>
        {Object.entries(element.styles).map(
          ([CSSPropertyName, CSSPropertyValue]) => {
            const isColor = isValidColor(CSSPropertyValue)
            const isOverwritten = styleSheetsAbove.some((styleSheet) => {
              return styleSheet.styles.hasOwnProperty(CSSPropertyName)
            })

            return (
              <Property key={CSSPropertyName} isOverwritten={isOverwritten}>
                <PropertyName>{CSSPropertyName}</PropertyName>

                <Equal>: </Equal>

                {isColor && <PropertyColor fontColor={CSSPropertyValue} />}

                <PropertyValue>{CSSPropertyValue}</PropertyValue>
              </Property>
            )
          }
        )}
      </PropertyWrapper>
    </>
  )
}
