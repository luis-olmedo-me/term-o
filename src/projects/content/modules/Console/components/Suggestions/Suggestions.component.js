import * as React from 'react'
import { useEffect, useRef } from 'react'
import { Suggestion, SuggestionsWrapper } from './Suggestions.styles'

export const Suggestions = ({ suggestions, selectedId, onSuggestionClick }) => {
  const selectedSuggestionReference = useRef(null)

  useEffect(
    function scrollIntoSelectedSuggestion() {
      if (!suggestions.length) return

      const selectedItem =
        selectedSuggestionReference.current.children[selectedId]

      if (selectedItem) {
        selectedItem.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }
    },
    [suggestions, selectedId]
  )

  return (
    <SuggestionsWrapper ref={selectedSuggestionReference}>
      {suggestions.map((suggestion, index) => {
        const isSelected = selectedId === index
        const aliases = suggestion.alias || ''

        return (
          <Suggestion
            key={suggestion.value}
            selected={isSelected}
            onClick={() => onSuggestionClick(index)}
          >
            <span>{suggestion.value}</span>
            <span>{aliases}</span>
          </Suggestion>
        )
      })}
    </SuggestionsWrapper>
  )
}
