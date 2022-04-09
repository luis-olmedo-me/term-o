import styled from 'styled-components'
import { Element } from './components/Element/Element.component'

export const ElementsWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  word-break: break-word;

  &&.pinned {
    padding-bottom: 10px;
    border-bottom: 1px dashed #ccc;
    margin-bottom: 10px;
  }
`
