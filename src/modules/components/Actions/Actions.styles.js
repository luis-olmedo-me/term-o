import { theme as t } from '@src/helpers/theme.helpers'
import styled from 'styled-components'

export const ActionButtons = styled.div`
  display: inline-block;
  height: 100%;
  position: sticky;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: var(--tag-background-color);
  transition: background-color 0.2s ease-in-out;
  border-radius: ${props => (props.hasPostfix ? '0' : '0 3px 3px 0')};
  vertical-align: top;
  color: ${t('neutral.400')};
`
export const ActionButton = styled.button`
  height: 100%;
  background-color: transparent;
  border: none;
  font-weight: bold;
  font-family: Share Tech Mono;
  cursor: pointer;
  min-width: 2em;
  text-align: center;
  box-sizing: border-box;
  vertical-align: top;
  color: inherit;
  padding: 0;

  border-left: 1px solid;
  border-right: ${({ isLastItem }) => (isLastItem ? '1px solid' : 'unset')};
  border-color: ${t('transparent.300')};

  &:disabled,
  &:disabled:hover {
    background-color: ${t('transparent.200')};
    color: ${t('neutral.1000')};
  }
  &:hover {
    background-color: ${t('transparent.100')};
  }

  &:active,
  &:focus {
    outline: none;
  }
`

export const ItemsWrapper = styled.div`
  display: inline-block;
  height: -webkit-fill-available;
`
