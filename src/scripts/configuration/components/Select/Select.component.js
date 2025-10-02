import * as React from 'preact'
import * as S from './Select.styles'

export const Select = ({ options, value, onChange, loading = true }) => {
  const optionsDefined = typeof options === 'function' ? options() : options

  return (
    <S.SelecterWrapper className={loading ? 'loading' : null}>
      <S.Selecter value={value} onChange={onChange} disabled={loading}>
        <button>
          <selectedcontent></selectedcontent>
        </button>

        <S.OptionsWrapper className="vertical-scroller">
          {optionsDefined?.map(option => {
            return (
              <S.Option key={option.id} value={option.id}>
                <S.OptionText>{option.name}</S.OptionText>
              </S.Option>
            )
          })}
        </S.OptionsWrapper>
      </S.Selecter>
    </S.SelecterWrapper>
  )
}

Select.propTypes = {
  options: Array,
  value: String,
  onChange: Function,
  loading: Boolean
}
