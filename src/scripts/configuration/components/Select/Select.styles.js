import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const Selecter = styled.select`
  width: 300px;
  border: ${t('space.50')} solid ${t('colors.white', '40')};
  background-color: ${t('colors.white', '40')};
  color: ${t('colors.foreground')};
  border-radius: ${t('radius.200')};
  padding: ${t('space.250')} ${t('space.300')};
  transition:
    background-color 0.1s ease-in-out,
    color 0.1s ease-in-out;
  cursor: pointer;
  outline: none;

  &:focus {
    border: ${t('space.50')} solid ${t('colors.green')};
  }

  &:focus,
  &:active {
    outline: none;
  }

  &:hover {
    background-color: ${t('colors.green')};
    color: ${({ selected }) => (selected ? t('colors.brightGreen') : t('colors.brightWhite'))};
  }

  &:disabled {
    background-color: ${t('colors.white', '20')};
    border: ${t('space.50')} solid ${t('colors.white', '20')};
    color: ${t('colors.white', '60')};
    cursor: no-drop;

    &:focus {
      border: ${t('space.50')} solid ${t('colors.white', '20')};
    }

    &:hover {
      background-color: ${t('colors.white', '20')};
      color: ${t('colors.white', '80')};
    }
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

export const SelecterWrapper = styled.div`
  &.loading {
    width: fit-content;

    ${Selecter} {
      cursor: progress;
    }
  }
`

export const OptionsWrapper = styled.div`
  overflow: hidden scroll;
  height: 8rem;
  border-bottom: ${t('space.50')} solid ${t('colors.brightBlack')};
  border-left: ${t('space.50')} solid ${t('colors.brightBlack')};
  border-right: ${t('space.50')} solid ${t('colors.brightBlack')};
  background-color: ${t('colors.brightBlack')};
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

  &:focus,
  &:active {
    outline: none;
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

export const OptionText = styled.span`
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 250px;
`
