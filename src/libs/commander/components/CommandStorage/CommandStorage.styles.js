import { theme as t } from 'src/helpers/theme.helpers'
import styled from 'styled-components'
import { Tree } from '../../modules/Tree'

export const MaterialTree = styled(Tree)`
  padding: 5px;
  color: lightcyan;
  width: fit-content;
  min-width: 100%;
  box-sizing: border-box;
  line-height: calc(1em + 10px);
  padding: 7px;
  background-color: ${t('transparent.500')};
  box-sizing: border-box;
  border-radius: ${t('radius.200')};
`
