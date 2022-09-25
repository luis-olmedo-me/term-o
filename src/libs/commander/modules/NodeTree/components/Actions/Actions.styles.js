import styled from 'styled-components'

export const ActionButtons = styled.div`
  display: inline-block;
  height: 100%;
  position: sticky;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: var(--tag-background-color);
  transition: background-color 0.2s ease-in-out;
  border-radius: ${(props) => (props.hasPostfix ? '0' : '0 3px 3px 0')};
  vertical-align: top;
`
export const ActionButton = styled.button`
  height: 100%;
  background-color: transparent;
  border: none;
  color: #333;
  font-weight: bold;
  font-family: Share Tech Mono;
  padding: 0 10px;
  cursor: pointer;
  min-width: 2em;
  text-align: center;
  box-sizing: border-box;
  border-left: 1px solid #00000015;
  vertical-align: top;
  border-right: ${(props) =>
    props.isLastItem ? '1px solid #00000015' : 'unset'};

  &&:disabled {
    background-color: #00000015;
    color: #aaa;
  }
  &:hover {
    background-color: #00000005;
  }
  &:active {
    background-color: #00000015;
  }
`

export const ItemsWrapper = styled.div`
  display: inline-block;
  height: -webkit-fill-available;
`
