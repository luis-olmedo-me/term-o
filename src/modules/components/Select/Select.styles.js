import { theme as t } from 'src/helpers/theme.helpers'
import styled from 'styled-components'

const radius = t('radius.200')

export const DefaultTrigger = styled.button`
  height: 100%;
  line-height: 100%;
  display: inline-block;
  vertical-align: middle;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0 10px;
  transition: all 0.2s ease-in-out;
  font-size: 1em;
  background-color: ${t('neutral.1200')};
  color: ${t('neutral.400')};
`

export const SelectDefaultOptionsWrapper = styled.div`
  position: fixed;
  z-index: 1000003;
  inset: 0;
  width: 100%;
  height: fit-content;
  max-width: 220px;
  max-height: 150px;
  border-radius: ${radius};
  transform: translate(-50%, -50%);
  font-family: Share Tech Mono;
  padding: 10px 0;
  overflow-y: scroll;
  font-size: 1em;
  opacity: ${props => (props.areBoundsCalculated ? 1 : 0)};
  background-color: ${t('neutral.1200')};
  box-shadow: 0 0 15px 5px ${t('transparent.300')};

  && {
    scrollbar-width: auto;
    scrollbar-color: ${`${t('neutral.400')} ${t('neutral.1200')}`};
  }

  &&::-webkit-scrollbar {
    width: 9px;
  }

  &&::-webkit-scrollbar-track {
    background: ${t('neutral.1200')};
    border-radius: 0 ${radius} ${radius} 0;
    border-left: 1px solid ${t('neutral.1200')};
    padding: 0 3px;
  }

  &&::-webkit-scrollbar-thumb {
    background-color: ${t('neutral.400')};
    border-radius: ${radius};
  }
`

export const SelectDefaultOption = styled.div`
  line-height: 2.4em;
  vertical-align: middle;
  text-align: center;
  border-top: 1px solid ${t('neutral.1200')};
  cursor: pointer;
  color: ${t('neutral.400')};
  transition: all 0.2s ease-in-out;

  &&.disabled {
    color: ${t('neutral.1000')};
    background-color: ${t('neutral.1200')};

    &:hover {
      background-color: ${t('neutral.1200')};
    }
  }

  &&:last-child {
    border-bottom: 1px solid ${t('neutral.1200')};
  }
`
