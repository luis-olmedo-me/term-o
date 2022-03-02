import React, { useEffect, useRef } from 'react'
import { Suggestion, SuggestionsWrapper } from './Suggestions.styles'

export const Suggestions = ({ suggestions, selectedSuggestionId }) => {
  const selectedSuggestionReference = useRef(null)

  useEffect(
    function scrollIntoSelectedSuggestion() {
      const scrollTop = selectedSuggestionReference.current?.scrollTop
      const hasScrollTop = typeof scrollTop !== 'undefined'

      if (!suggestions.length) return
      if (!hasScrollTop) return

      const newScrollTopValue = selectedSuggestionId * 36
      const isInRange =
        newScrollTopValue > scrollTop && newScrollTopValue < scrollTop + 108

      if (isInRange) return

      selectedSuggestionReference.current.scrollTop = Math.max(
        newScrollTopValue - 72,
        0
      )
    },
    [suggestions, selectedSuggestionId]
  )

  return (
    <SuggestionsWrapper ref={selectedSuggestionReference}>
      {suggestions.map((suggestion, index) => {
        const isSelected = selectedSuggestionId === index
        const aliases = suggestion.aliases || []

        return (
          <Suggestion key={suggestion.value} selected={isSelected}>
            <span>{suggestion.value}</span>
            <span>{aliases.join(', ')}</span>
          </Suggestion>
        )
      })}
    </SuggestionsWrapper>
  )
}
