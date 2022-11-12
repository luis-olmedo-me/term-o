import config from 'libs/configuration'
import styled from 'styled-components'

const radius = config.getTheme('radius.200')

export const TreeWrapper = styled.div`
  white-space: nowrap;
  font-weight: bold;
  border-radius: ${radius} 0 0 ${radius};
  overscroll-behavior: contain;
`
