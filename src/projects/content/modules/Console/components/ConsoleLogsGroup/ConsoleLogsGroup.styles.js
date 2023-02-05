import { theme as t } from '@src/helpers/theme.helpers'
import styled from 'styled-components'

export const GroupContainer = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
`

export const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: ${t('neutral.200')};
  color: ${t('neutral.1200')};
  padding: 5px 10px;
  border-radius: ${t('radius.300')};
  margin: 0 10px 10px 10px;
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
