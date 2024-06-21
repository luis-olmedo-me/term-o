import * as React from 'preact'

import * as S from './Prompt.styles'

export const Prompt = ({ onEnter, value, prefix, inputRef }) => {
  const [value, setValue] = useState('')

  const handleChange = event => {
    const value = event.target.value

    setValue(value)
  }

  const handleKeyDown = event => {
    const key = event.key

    if (key === 'Enter') {
      setValue('')
    }
  }

  return (
    <S.PromptWrapper>
      <span>{prefix}</span>

      <S.Prompt contentEditable onChange={handleChange} onKeyDown={handleKeyDown} ref={inputRef}>
        {value}
      </S.Prompt>
    </S.PromptWrapper>
  )
}
