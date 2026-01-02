import { dot } from './ColorDot.module.scss'

export const ColorDot = ({ option }) => {
  return <span className={dot} data-bgcolor={option.id} />
}

ColorDot.propTypes = {
  option: String
}
