import { theme as t } from '@src/helpers/theme.helpers'
import styled from 'styled-components'

const radius = t('radius.200')

export const TagWrapper = styled.span`
  --tag-background-color: ${({ isNodeObjetive }) =>
    isNodeObjetive ? t('yellow.900') : t('neutral.1200')};

  border-radius: ${t('radius.200')};
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s ease-in-out;
  display: inline-block;
  height: 2em;
  line-height: 2em;
  padding: ${props => (props.textNode ? '0 7px' : '0')};

  background-color: var(--tag-background-color);
  color: ${({ isHidden }) => (isHidden ? t('neutral.800') : t('green.700'))};
`

export const GapNodesWrapper = styled.div`
  margin: ${props => (props.isRoot ? '0' : '10px 0')};
  scroll-snap-align: start;
  scroll-snap-stop: always;
`

export const Prefix = styled.div`
  width: 10px;
  height: 100%;
  position: sticky;
  left: 0;
  display: inline-block;
  vertical-align: top;
  background-color: ${t('pink.700')};

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: ${radius} 0 0 ${radius};
    background-color: var(--tag-background-color);
  }
`

export const Postfix = styled.div`
  width: 10px;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  background-color: ${t('pink.700')};
  position: relative;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    right: 0;
    top: 0;
    height: 100%;
    border-radius: 0 ${radius} ${radius} 0;
    background-color: var(--tag-background-color);
  }
`
