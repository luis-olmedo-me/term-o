import React from 'react'
import {
  Equal,
  Property,
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
            return (
              <Property key={CSSPropertyName}>
                <PropertyName>{CSSPropertyName}</PropertyName>
                <Equal>: </Equal>
                <PropertyValue>{CSSPropertyValue}</PropertyValue>
              </Property>
            )
          }
        )}
      </PropertyWrapper>
    </>
  )
}
