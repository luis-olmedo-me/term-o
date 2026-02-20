import { textAreaInput } from './TextArea.module.scss'

export const TextArea = ({ onChange, onBlur, value, name, maxLines }) => {
  return (
    <textarea
      className={textAreaInput}
      name={name}
      onBlur={onBlur}
      onInput={onChange}
      rows={maxLines}
      value={value}
      spellCheck="false"
    />
  )
}

TextArea.propTypes = {
  onChange: Function,
  onBlur: Function,
  value: Boolean,
  maxLines: Number,
  name: String
}
