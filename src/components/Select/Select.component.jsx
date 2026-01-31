import { transparentTrack, verticalScroller } from '@styles/global.module.scss'
import {
  optionItem,
  optionsWrapper,
  optionText,
  selectedContent,
  selecter,
  selecterWrapper
} from './Select.module.scss'

export const Select = ({
  options,
  value,
  onChange,
  name,
  loading = false,
  OptionPrefixComponent = null
}) => {
  return (
    <div className={selecterWrapper} data-loading={loading}>
      <select className={selecter} value={value} onChange={onChange} disabled={loading} name={name}>
        <button>
          <selectedcontent className={selectedContent} />
        </button>

        <div className={`${optionsWrapper} ${verticalScroller} ${transparentTrack}`}>
          {options?.map(option => {
            return (
              <option key={option.id} className={optionItem} value={option.id}>
                {OptionPrefixComponent && <OptionPrefixComponent option={option} />}

                <span className={optionText}>{option.name}</span>
              </option>
            )
          })}
        </div>
      </select>
    </div>
  )
}

Select.propTypes = {
  options: Array,
  value: String,
  name: String,
  onChange: Function,
  loading: Boolean,
  OptionPrefixComponent: Object
}
