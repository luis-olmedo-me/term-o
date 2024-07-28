import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const ModalWrapper = styled.dialog`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background-color: ${t('colors.background')};
  color: ${t('colors.foreground')};
`

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${t('space.400')} ${t('space.600')};
`

export const ModalHeaderTitle = styled.h2`
  font-size: ${t('fontSize.100')};
  margin: 0;
`

export const ModalContent = styled.header`
  padding: 0 ${t('space.600')};
`
