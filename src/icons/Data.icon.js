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
        d="M99.12 274H219.88C229.886 274 238 284.006 238 292.12V412.88C238 422.886 229.886 431 219.88 431H99.12C89.114 431 81 420.994 81 412.88V292.12C81 282.114 89.114 274 99.12 274Z"
        fill="currentColor"
      />
      <path
        d="M99.2354 106H220.765C230.834 106 239 116.006 239 124.12V244.88C239 254.886 230.834 263 220.765 263H99.2354C89.1657 263 81 252.994 81 244.88V124.12C81 114.114 89.1657 106 99.2354 106Z"
        fill="currentColor"
      />
      <path
        d="M269.005 275H388.995C398.938 275 407 284.942 407 293.005V412.995C407 422.938 398.938 431 388.995 431H269.005C259.062 431 251 421.058 251 412.995V293.005C251 283.062 259.062 275 269.005 275Z"
        fill="currentColor"
      />
      <path
        d="M292.12 81H412.88C422.886 81 431 91.006 431 99.12V219.88C431 229.886 422.886 238 412.88 238H292.12C282.114 238 274 227.994 274 219.88V99.12C274 89.114 282.114 81 292.12 81Z"
        fill="currentColor"
      />
    </svg>
  )
}

Data.propTypes = iconPropType

export default Data
