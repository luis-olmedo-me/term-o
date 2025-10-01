import * as React from 'preact'
import * as S from './Select.styles'

export const Select = ({ options, value, onChange }) => {
  return (
    <S.Selecter value={value} onChange={onChange}>
      <button>
        <selectedcontent></selectedcontent>
      </button>

      <S.OptionsWrapper className="vertical-scroller">
        {options.map(option => {
          return (
            <S.Option key={option.id} value={option.name}>
              <span>{option.name}</span>
            </S.Option>
          )
        })}
      </S.OptionsWrapper>
    </S.Selecter>
  )
}

Select.propTypes = {
  options: Array,
  value: String,
  onChange: Function
}
