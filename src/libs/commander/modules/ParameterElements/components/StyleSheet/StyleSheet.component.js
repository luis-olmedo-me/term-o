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

export const StyleSheet = ({ element = {}, className = '' }) => {
  return (
    <>
      <StyleSheetWrapper className={className}>
        <Title>{element.title}</Title>
      </StyleSheetWrapper>

      <PropertyWrapper>
        {Object.entries(element.styles).map(
          ([CSSPropertyName, CSSPropertyValue]) => {
            const isColor = isValidColor(CSSPropertyValue)

            return (
              <Property key={CSSPropertyName}>
                <PropertyName>{CSSPropertyName}</PropertyName>

                <Equal>: </Equal>

                {isColor && <PropertyColor fontColor={CSSPropertyValue} />}

                <PropertyValue color={isColor ? CSSPropertyValue : ''}>
                  {CSSPropertyValue}
                </PropertyValue>
              </Property>
            )
          }
        )}
      </PropertyWrapper>
    </>
  )
}
