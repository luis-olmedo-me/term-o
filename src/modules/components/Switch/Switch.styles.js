import { theme as t } from '@src/helpers/theme.helpers'
import styled from 'styled-components'

export const FakeInput = styled.div`
  position: relative;
  width: 45px;
  height: 20px;
  border: 3px solid ${t('transparent.000')};
  background-color: ${t('transparent.450')};
  border-radius: 20px;
  transition: background-color 0.3s ease-in-out;

  &.checked {
    background-color: ${t('transparent.750')};
  }

  &:before {
    content: '';
    transition: left 0.3s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: ${t('neutral.300')};
    transition: left 0.3s ease-in-out;
  }

  &.checked:before {
    left: 25px;
  }
`
