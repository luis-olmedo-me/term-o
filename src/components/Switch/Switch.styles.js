import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const SimulatedSwitch = styled.div`
  background-color: red;
  height: 1.5rem;
  width: 2.5rem;
  border: ${t('space.50')} solid ${t('colors.white', '40')};
  background-color: ${t('colors.white', '40')};
  border-radius: ${t('radius.200')};
  transition:
    background-color 0.1s ease-in-out,
    color 0.1s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    width: 30%;
    height: calc(100% - ${t('space.100')} * 2);
    background-color: ${t('colors.white', '80')};
    bottom: ${t('space.100')};
    left: ${t('space.100')};
    border-radius: ${t('radius.200')};
    cursor: pointer;
    transition:
      background-color 0.1s ease-in-out,
      color 0.1s ease-in-out,
      left 0.1s ease-in-out;
  }

  &.selected {
    &::after {
      background-color: ${t('colors.brightAccent')};
      left: calc(70% - ${t('space.100')});
    }
  }
`

export const SwitchInput = styled.input`
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
  margin: 0;

  &:hover + ${SimulatedSwitch}::after {
    background-color: ${t('colors.white', 'aa')};
  }
  &:hover + ${SimulatedSwitch}.selected::after {
    background-color: ${t('colors.brightWhite')};
  }
  &:hover + ${SimulatedSwitch} {
    background-color: ${t('colors.accent', '40')};
  }
  &:hover + ${SimulatedSwitch}.selected {
    background-color: ${t('colors.accent', 'cc')};
  }

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }
`

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${t('space.400')};
  background-color: ${t('colors.background')};
  color: ${t('colors.foreground')};
  cursor: text;
  position: relative;
  width: fit-content;
`

export const Prefix = styled.span`
  &::selection {
    color: ${t('colors.accent')};
    background-color: ${t('colors.selectionBackground')};
  }
`
