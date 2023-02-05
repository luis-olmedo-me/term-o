import { theme as t } from '@src/helpers/theme.helpers'
import styled, { keyframes } from 'styled-components'

const Birth = keyframes`
  from {
    transform: scaleX(0);
    opacity: 0; 
    height: auto;
  }

  to {
    transform: scaleX(1);
    opacity: 1;   
    height: 0;
  }
`

export const GroupContainer = styled.div`
  position: relative;
`

export const GroupCounter = styled.span`
  padding: 0.1rem 0.3rem;
  background-color: ${t('neutral.1200')};
  color: ${t('neutral.200')};
  border-radius: 1rem;
  font-weight: bold;

  &[data-disabled] {
    background-color: ${t('transparent.750')};
  }
`

export const GroupHeader = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${t('transparent.350')};
  color: ${t('neutral.1200')};
  padding: 5px 10px;
  margin-bottom: 10px;
  border-radius: ${t('radius.300')};
  cursor: pointer;
  border: none;
  width: 100%;
  font-family: Share Tech Mono;
  font-size: 1rem;
  transition: background-color 0.2s ease-in-out;

  &:focus,
  &:active {
    outline: none;
  }

  &:hover {
    background-color: ${t('transparent.450')};
  }

  &:disabled {
    background-color: ${t('transparent.250')};
    color: ${t('neutral.1000')};
  }
`

export const SideLine = styled.div`
  width: 10px;
  border-radius: 5px;
  background-color: ${t('neutral.200')};
  margin-right: 10px;
`

export const GroupContent = styled.div`
  width: 10px;
  border-radius: 5px;
  flex: 1;
`

export const GroupContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out, height 0.2s ease-in-out;
  margin-bottom: 10px;
  transform: scaleY(1);
  transform-origin: top;
  animation: ${Birth} 0.2s ease-in-out;
  height: auto;

  &.hidden {
    opacity: 0;
    pointer-events: none;
    height: 0;
    margin-bottom: 0;
    transform: scaleY(0);
  }
`
