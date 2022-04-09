import styled from 'styled-components'
import { Element } from './components/Element/Element.component'

export const ElementsWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  word-break: break-word;
`

export const PinnedElementsWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  word-break: break-word;
  padding-bottom: 10px;
  border-bottom: 1px dashed #ccc;
  margin-bottom: 10px;
`

export const PinnedElement = styled(Element)`
  border-left: 10px solid #f21361;
`
