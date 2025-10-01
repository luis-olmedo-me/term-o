import * as React from 'preact'
import * as S from './Select.styles'

export const Select = ({ options }) => {
  return (
    <S.Selecter>
      <button>
        <selectedcontent></selectedcontent>
      </button>

      {options.map(option => {
        return (
          <S.Option key={option.id} value={option.name}>
            <span>{option.name}</span>
          </S.Option>
        )
      })}
    </S.Selecter>
  )
}

Select.propTypes = {
  options: Array
}
