import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const Selecter = styled.select`
  min-width: 200px;
  max-width: 300px;
  border: ${t('space.50')} solid ${t('colors.brightBlack', '40')};
  background-color: ${t('colors.brightBlack', '40')};
  border-radius: ${t('radius.200')};
  padding: ${t('space.250')} ${t('space.300')};

  &:focus {
    border: ${t('space.50')} solid ${t('colors.green')};
  }

  &:hover {
    background-color: ${t('colors.black')};
    color: ${({ selected }) => (selected ? t('colors.brightGreen') : t('colors.brightWhite'))};
  }

  &::picker-icon {
    transition: 0.2s rotate;
  }
  &:open::picker-icon {
    rotate: 180deg;
  }
`

export const Option = styled.option`
  background-color: ${t('colors.black')};
  border-top: ${t('space.50')} solid ${t('colors.brightBlack')};
  color: ${t('colors.foreground')};
  transition: 0.4s;
  padding: ${t('space.200')} ${t('space.300')};
  cursor: pointer;

  &:hover,
  &:focus {
    color: ${t('colors.green')};
    font-weight: bold;
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
