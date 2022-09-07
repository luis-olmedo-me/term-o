import styled from 'styled-components'

export const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000040;
`

export const Modal = styled.div`
  color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  background: white;
  z-index: 1;
  width: 50%;
  height: 50%;
  min-width: 300px;
  min-height: 330px;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  padding: 10px;
  box-sizing: border-box;
`
