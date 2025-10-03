import * as React from 'preact'
import * as S from './Select.styles'

export const Select = ({ options, value, onChange, name, loading = false, OptionPrefix }) => {
  return (
    <S.SelecterWrapper aria-loading={loading}>
      <S.Selecter value={value} onChange={onChange} disabled={loading} name={name}>
        <button>
          <selectedcontent className="selected-content"></selectedcontent>
        </button>

        <S.OptionsWrapper className="vertical-scroller">
          {options?.map(option => {
            return (
              <S.Option key={option.id} value={option.id}>
                {OptionPrefix && <OptionPrefix option={option} />}

                <S.OptionText className="select-option">{option.name}</S.OptionText>
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
  name: String,
  onChange: Function,
  loading: Boolean,
  OptionPrefix: Object
}
