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

export const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${t('neutral.200')};
  color: ${t('neutral.1200')};
  padding: 5px 10px;
  border-radius: ${t('radius.300')};
  margin: 0 10px 10px 10px;
  cursor: pointer;

  &:hover {
    background-color: ${t('neutral.300')};
  }
`

export const SideLine = styled.div`
  width: 10px;
  border-radius: 5px;
  background-color: ${t('neutral.200')};
  margin-left: 10px;
`

export const GroupContent = styled.div`
  margin: 0 10px;
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
