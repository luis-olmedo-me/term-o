import config from 'libs/configuration'
import styled from 'styled-components'
import { Actions } from '../Actions'

export const TableWrapper = styled.div`
  width: 100%;
  border-collapse: collapse;
  padding: 10px;
  background-color: ${config.getTheme('transparent.500')};
  box-sizing: border-box;
  border-radius: 3px;
`

export const TableRow = styled.div`
  display: flex;
  vertical-align: baseline;
  color: ${config.getTheme('neutral.1200')};
  font-weight: normal;
  padding: 0;
  border-radius: 0;
  text-align: left;
  font-size: 1em;
  line-height: 2em;
  gap: 10px;
  margin: 0 auto 6px;

  &.header {
    background-color: ${config.getTheme('neutral.1200')};
    color: ${config.getTheme('neutral.300')};
    font-weight: bold;
    padding: 1px 0;
    border-radius: 3px 3px 0 0;
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
  text-align: ${(props) => (props.center ? 'center' : 'left')};
  flex-grow: ${(props) => (props.hasFixedWidth ? 'unset' : '1')};
  background-color: ${config.getTheme('transparent.000')};

  &:hover {
    background-color: ${config.getTheme('transparent.250')};
    color: ${config.getTheme('yellow.800')};
  }

  &:hover .actions {
    opacity: 1;
  }
`

export const TableHeaderRowValue = styled.span`
  width: ${(props) => props.width};
  flex-grow: ${(props) => (props.hasFixedWidth ? 'unset' : '1')};
`

export const TableActionsWrapper = styled.div`
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
`

export const TableActions = styled(Actions)`
  position: absolute;
  background-color: ${config.getTheme('purple.700')};
  color: ${config.getTheme('neutral.1200')};
`
