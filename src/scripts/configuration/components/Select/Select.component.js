import * as React from 'preact'
import * as S from './Select.styles'

export const Select = () => {
  return (
    <S.Selecter>
      <button>
        <selectedcontent></selectedcontent>
      </button>

      <S.Option value="">
        <span></span>
        Please select a pet
      </S.Option>
      <S.Option value="cat">
        <span>Cat</span>
      </S.Option>
      <S.Option value="dog">
        <span>Dog</span>
      </S.Option>
      <S.Option value="hamster">
        <span>Hamster</span>
      </S.Option>
      <S.Option value="chicken">
        <span>Chicken</span>
      </S.Option>
      <S.Option value="fish">
        <span>Fish</span>
      </S.Option>
      <S.Option value="snake">
        <span>Snake</span>
      </S.Option>
    </S.Selecter>
  )
}
