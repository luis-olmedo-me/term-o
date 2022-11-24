import { theme as t } from '@src/helpers/theme.helpers'
import { LogContainer } from 'libs/commander/modules/Log'
import styled from 'styled-components'

const radius = t('radius.100')

export const ConsoleWrapper = styled.div`
  position: fixed;
  z-index: 1000000;
  font-family: 'Share Tech Mono', monospace;
  opacity: (0);
  transform: scale(0);
  pointer-events: none;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.15);
  transition: inset 0.05s ease-in-out, opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  min-height: 690px;
  display: flex;
  flex-flow: column;
  font-size: 16px;
  inset: 10px;

  &.open {
    pointer-events: all;
    transform: scale(1);
    opacity: (1);
  }

  &.moving {
    opacity: 0;

    ${LogContainer} {
      opacity: 0;
    }
  }
`

export const ConsoleTitle = styled.h1`
  padding: 5px 0 2px;
  margin: 0;
  text-align: center;
  font-weight: normal;
  font-size: 25px;
  box-sizing: border-box;
  background-color: ${t('neutral.100')};
  color: ${t('neutral.1200')};
  cursor: pointer;
  user-select: none;
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 1;
  transition: background-color 0.2s ease-in-out;
  border-radius: ${radius} ${radius} 0 0;
  cursor: grab;
  font-size: 1.5em;
  line-height: 1.2em;

  &&:hover,
  &&:active {
    background-color: ${t('neutral.200')};
  }

  &&:active {
    cursor: grabbing;
  }
`

export const ConsoleLogs = styled.div`
  padding: 10px;
  width: 100%;
  border: none;
  box-sizing: border-box;
  background-color: ${t('neutral.100')};
  display: block;
  overflow-y: scroll;
  border-width: 0 1px;
  flex: 1;
  border-radius: ${radius};
  cursor: text;
  overscroll-behavior: contain;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`
