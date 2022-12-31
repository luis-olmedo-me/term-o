import { theme as t } from '@src/helpers/theme.helpers'
import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
`

export const Input = styled.input`
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: fit-content;
  height: fit-content;
`

export const FakeInput = styled.div`
  position: relative;
  width: 45px;
  height: 30px;
  border-radius: 20px;
  background-color: ${t('blue.700')};

  &:before {
    content: '';
    position: absolute;
    top: 2px;
    left: 3px;
    width: 25px;
    height: 25px;
    border-radius: 100%;
    background-color: ${t('neutral.200')};
  }

  &.checked:before {
    left: 17px;
  }
`
