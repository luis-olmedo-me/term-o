import React from 'react'
import {
  Property,
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
                <span>{CSSPropertyName}</span>
                <span>: </span>
                <span>{CSSPropertyValue}</span>
              </Property>
            )
          }
        )}
      </PropertyWrapper>
    </>
  )
}
