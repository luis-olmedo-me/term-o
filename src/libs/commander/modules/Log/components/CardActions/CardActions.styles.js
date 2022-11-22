import { theme as t } from '@src/helpers/theme.helpers'
import styled from 'styled-components'

export const Groups = styled.div`
  background-color: ${t('transparent.100')};
  color: ${t('neutral.1200')};
  display: flex;
  justify-content: center;
`

export const Action = styled.button`
  border: none;
  padding: ${props => (props.hasIcon ? '5px 3px' : '5px 10px')};
  cursor: pointer;
  background-color: ${t('transparent.200')};
  transition: background-color 0.2s ease-in-out;
  font-family: Share Tech Mono;
  color: inherit;
  font-size: 16px;

  &:hover {
    background-color: ${t('transparent.150')};
  }

  &:focus,
  &:active {
    outline: none;
  }

  &&.selected {
    background-color: ${t('transparent.450')};
  }

  &&.disabled,
  &&.disabled:hover {
    background-color: ${t('transparent.400')};
  }

  &::selection {
    background-color: ${t('transparent.300')};
    color: ${t('yellow.800')};
  }

  &.invalid {
    background-color: ${t('red.600')};
    text-decoration: line-through;

    &:hover {
      background-color: ${t('red.500')};
    }
  }
`
