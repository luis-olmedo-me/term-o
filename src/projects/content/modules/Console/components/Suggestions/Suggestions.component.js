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

      const newScrollTopValue = selectedSuggestionId * 40
      const isInRange =
        newScrollTopValue > scrollTop && newScrollTopValue < scrollTop + 120

      if (isInRange) return

      selectedSuggestionReference.current.scrollTop = Math.max(
        newScrollTopValue - 80,
        0
      )
    },
    [suggestions, selectedSuggestionId]
  )

  return (
    <SuggestionsWrapper ref={selectedSuggestionReference}>
      <Suggestion selected={selectedSuggestionId === -1}>
        <span>Hit enter to run!</span>
      </Suggestion>

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
