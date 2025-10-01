import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const Selecter = styled.select`
  min-width: 200px;
  max-width: 300px;
  border: ${t('space.50')} solid ${t('colors.white', '40')};
  background-color: ${t('colors.white', '40')};
  color: ${t('colors.foreground')};
  border-radius: ${t('radius.200')};
  padding: ${t('space.250')} ${t('space.300')};
  cursor: pointer;

  &:focus {
    border: ${t('space.50')} solid ${t('colors.green')};
  }

  &:hover {
    background-color: ${t('colors.green')};
    color: ${({ selected }) => (selected ? t('colors.brightGreen') : t('colors.brightWhite'))};
  }

  &::picker-icon {
    transition: 0.2s rotate;
  }
  &:open {
    border-radius: ${t('radius.200')} ${t('radius.200')} 0 0;
    border-bottom: ${t('space.50')} solid ${t('colors.brightBlack')};

    &::picker-icon {
      rotate: 180deg;
    }
  }
`

export const OptionsWrapper = styled.div`
  overflow: hidden scroll;
  height: 8rem;
  border-bottom: ${t('space.50')} solid ${t('colors.brightBlack')};
  border-left: ${t('space.50')} solid ${t('colors.brightBlack')};
  border-right: ${t('space.50')} solid ${t('colors.brightBlack')};
`

export const Option = styled.option`
  background-color: ${t('colors.background')};
  border-top: ${t('space.50')} solid ${t('colors.brightBlack')};
  border-right: ${t('space.50')} solid ${t('colors.brightBlack')};
  color: ${t('colors.foreground')};
  transition:
    background-color 0.1s ease-in-out,
    color 0.1s ease-in-out;
  padding: ${t('space.200')} ${t('space.300')};
  cursor: pointer;

  &:first-of-type {
    border-top: none;
  }

  &:hover,
  &:focus {
    color: ${t('colors.green')};
  }

  :is(selected) {
    color: ${t('colors.brightGreen')};
  }

  &::checkmark {
    order: 1;
    margin-left: auto;
    content: '◉';
  }
`
