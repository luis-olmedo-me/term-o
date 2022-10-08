import styled from 'styled-components'
import { Actions } from 'libs/commander/modules/NodeTree/components/Actions/Actions.component'

export const TableWrapper = styled.div`
  width: 100%;
  border-collapse: collapse;
`

export const TableRow = styled.div`
  display: flex;
  vertical-align: baseline;
  background-color: ${(props) => (props.header ? '#fafafa' : 'transparent')};
  color: ${(props) => (props.header ? '#222' : '#fafafa')};
  font-weight: ${(props) => (props.header ? 'bold' : 'normal')};
  padding: ${(props) => (props.header ? '5px 20px' : '0 20px')};
  border-radius: ${(props) => (props.header ? '5px' : '0')};
  text-align: ${(props) => (props.header ? 'center' : 'left')};
  font-size: 1em;
  line-height: 2em;
  gap: 5px;
  width: 95%;
  margin: 0 auto 6px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const TableRowValue = styled.span`
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  position: relative;

  &&:hover {
    background-color: #f5f5f512;
  }
`

export const TableActions = styled(Actions)`
  position: absolute;
  background-color: #7928ca;
  color: white;
`
