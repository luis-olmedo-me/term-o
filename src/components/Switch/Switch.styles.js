import { theme as t } from '@src/helpers/themes.helpers'
import styled from 'styled-components'

export const SimulatedSwitch = styled.div`
  background-color: red;
  height: 1.5rem;
  width: 2.5rem;
  border: ${t('space.50')} solid ${t('colors.brightBlack')};
  background-color: ${t('colors.white', '40')};
  border-radius: ${t('radius.200')};
  box-sizing: border-box;
  transition:
    background-color 0.1s ease-in-out,
    color 0.1s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    width: 30%;
    height: calc(100% - ${t('space.200')} * 2);
    background-color: ${t('colors.accent', '80')};
    border: ${t('space.50')} solid ${t('colors.foreground', '80')};
    bottom: ${t('space.200')};
    left: ${t('space.200')};
    border-radius: ${t('radius.200')};
    box-sizing: border-box;
    cursor: pointer;
    transition:
      background-color 0.1s ease-in-out,
      color 0.1s ease-in-out,
      left 0.1s ease-in-out;
  }

  &.selected {
    &::after {
      border-color: ${t('colors.foreground')};
      background-color: ${t('colors.brightAccent')};
      left: calc(70% - ${t('space.200')});
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

  &:hover + ${SimulatedSwitch} {
    background-color: ${t('colors.accent', '40')};

    &::after {
      border-color: ${t('colors.brightWhite', '80')};
      background-color: ${t('colors.brightAccent', '40')};
    }
  }
  &:hover + ${SimulatedSwitch}.selected {
    background-color: ${t('colors.accent', 'cc')};

    &::after {
      border-color: ${t('colors.brightWhite')};
      background-color: ${t('colors.brightAccent')};
    }
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
  background-color: transparent;
  color: ${t('colors.foreground')};
  cursor: text;
  position: relative;
  width: fit-content;
`
