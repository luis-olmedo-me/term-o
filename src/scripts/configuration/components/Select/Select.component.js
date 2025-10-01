import * as React from 'preact'

export const Select = () => {
  return (
    <select id="pet-select">
      <button>
        <selectedcontent></selectedcontent>
      </button>

      <option value="">Please select a pet</option>
      <option value="cat">
        <span className="icon" aria-hidden="true">
          🐱
        </span>
        <span className="option-label">Cat</span>
      </option>
      <option value="dog">
        <span className="icon" aria-hidden="true">
          🐶
        </span>
        <span className="option-label">Dog</span>
      </option>
      <option value="hamster">
        <span className="icon" aria-hidden="true">
          🐹
        </span>
        <span className="option-label">Hamster</span>
      </option>
      <option value="chicken">
        <span className="icon" aria-hidden="true">
          🐔
        </span>
        <span className="option-label">Chicken</span>
      </option>
      <option value="fish">
        <span className="icon" aria-hidden="true">
          🐟
        </span>
        <span className="option-label">Fish</span>
      </option>
      <option value="snake">
        <span className="icon" aria-hidden="true">
          🐍
        </span>
        <span className="option-label">Snake</span>
      </option>
    </select>
  )
}
