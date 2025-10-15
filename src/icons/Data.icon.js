import * as React from 'preact'

import { iconPropType } from '@src/constants/icon.constants'

const Data = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M89.2741 275H217.726C228.369 275 237 285.58 237 294.159V421.841C237 432.421 228.369 441 217.726 441H89.2741C78.6309 441 70 430.42 70 421.841V294.159C70 283.579 78.6309 275 89.2741 275Z"
        fill="currentColor"
      />
      <path
        d="M89.2741 96H217.726C228.369 96 237 106.643 237 115.274V243.726C237 254.369 228.369 263 217.726 263H89.2741C78.6309 263 70 252.357 70 243.726V115.274C70 104.631 78.6309 96 89.2741 96Z"
        fill="currentColor"
      />
      <path
        d="M269.043 275H395.957C406.473 275 415 285.58 415 294.159V421.841C415 432.421 406.473 441 395.957 441H269.043C258.527 441 250 430.42 250 421.841V294.159C250 283.579 258.527 275 269.043 275Z"
        fill="currentColor"
      />
      <path
        d="M294.159 70H421.841C432.421 70 441 80.6433 441 89.2741V217.726C441 228.369 432.421 237 421.841 237H294.159C283.579 237 275 226.357 275 217.726V89.2741C275 78.6309 283.579 70 294.159 70Z"
        fill="currentColor"
      />
    </svg>
  )
}

Data.propTypes = iconPropType

export default Data
