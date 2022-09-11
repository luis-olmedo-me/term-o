import React, { useEffect, useRef } from 'react'
import { Suggestion, SuggestionsWrapper } from './Suggestions.styles'

export const Suggestions = ({ suggestions, selectedSuggestionId }) => {
  const selectedSuggestionReference = useRef(null)

  useEffect(
    function scrollIntoSelectedSuggestion() {
      if (!suggestions.length) return

      const selectedItem =
        selectedSuggestionReference.current.children[selectedSuggestionId]

      if (selectedItem) {
        selectedItem.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }
    },
    [suggestions, selectedSuggestionId]
  )

  return (
    <SuggestionsWrapper ref={selectedSuggestionReference}>
      {suggestions.map((suggestion, index) => {
        const isSelected = selectedSuggestionId === index
        const aliases = suggestion.aliases || ''

        return (
          <Suggestion key={suggestion.value} selected={isSelected}>
            <span>{suggestion.value}</span>
            <span>{aliases}</span>
          </Suggestion>
        )
      })}
    </SuggestionsWrapper>
  )
}
