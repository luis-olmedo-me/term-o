import ReactDOM from 'react-dom'
import { appRoot } from '../../../projects/content/content.constants'

export const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, appRoot)
}
