import { theme as t } from '@src/helpers/theme.helpers'
import styled from 'styled-components'
import { Actions } from '../Actions'
import { Checkbox } from '../Checkbox/Checkbox.component'

export const TableWrapper = styled.div`
  width: 100%;
  border-collapse: collapse;
  padding: 10px;
  box-sizing: border-box;
  border-radius: ${t('radius.200')};
  background-color: ${t('transparent.300')};
`

export const TableRow = styled.div`
  display: flex;
  vertical-align: baseline;
  color: ${t('neutral.1200')};
  font-weight: normal;
  padding: 0;
  border-radius: 0;
  text-align: left;
  font-size: 1em;
  line-height: 2em;
  gap: 10px;
  margin: 0 auto 6px;

  &.header {
    background-color: ${t('neutral.1200')};
    color: ${t('neutral.300')};
    font-weight: bold;
    padding: 1px 0;
    border-radius: ${t('radius.300')};
    text-align: center;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

export const TableRowValue = styled.span`
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  text-align: ${props => (props.center ? 'center' : 'left')};
  flex-grow: ${props => (props.hasFixedWidth ? 'unset' : '1')};
  background-color: ${t('transparent.000')};

  &.internal {
    border-radius: ${t('radius.300')};
    padding: 0 5px;

    &:hover {
      background-color: ${t('transparent.250')};
      color: ${t('yellow.800')};
    }
  }

  &:hover .actions {
    opacity: 1;
  }
`

export const TableHeaderRowValue = styled.span`
  width: ${props => props.width};
  flex-grow: ${props => (props.hasFixedWidth ? 'unset' : '1')};
`

export const TableActionsWrapper = styled.div`
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
`

export const TableActions = styled(Actions)`
  position: absolute;
  background-color: ${t('purple.700')};
  color: ${t('neutral.1200')};
`

export const HeaderCheckbox = styled(Checkbox)`
  &.checked {
    background-color: ${t('yellow.800')};
  }
`
