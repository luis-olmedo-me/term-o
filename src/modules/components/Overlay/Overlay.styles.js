import { theme as t } from 'src/helpers/theme.helpers'
import styled from 'styled-components'

export const OverlayWrapper = styled.div`
  position: fixed;
  z-index: 100000;
  inset: 0;
  width: 100%;
  pointer-events: none;
  transition: background-color 0.2s ease-in-out;

  background-color: ${({ isHighlighting }) =>
    isHighlighting ? t('transparent.700') : t('transparent.000')};
`

export const HighlightedElement = styled.div`
  position: absolute;
  opacity: 0.5;
  background-color: transparent;
  inset: 0;
  width: 100%;
  box-sizing: border-box;
  opacity: ${props => (props.isHighlighting ? 1 : 0)};

  &&.horizontal-limit,
  &&.vertical-limit {
    border: dashed ${t('blue.800')};
  }
  &&.horizontal-limit {
    border-width: 1px 0;
  }
  &&.vertical-limit {
    border-width: 0 1px;
  }

  &&.box {
    background-color: ${t('transparent.150')};
  }
`
