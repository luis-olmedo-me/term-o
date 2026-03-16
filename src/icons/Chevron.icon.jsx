import { iconPropType } from '@src/constants/icon.constants'

const Chevron = ({ size, className }) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 511 512"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M345.92 278.899L212.584 420.522C208.004 425.385 202.071 428.76 195.554 430.208C189.037 431.656 182.236 431.111 176.031 428.643C169.827 426.176 164.505 421.9 160.756 416.37C157.006 410.839 155.001 404.308 155 397.623V114.377C155.001 107.692 157.006 101.161 160.756 95.6304C164.505 90.0997 169.827 85.8238 176.031 83.3566C182.236 80.8894 189.037 80.3445 195.554 81.7925C202.071 83.2404 208.004 86.6146 212.584 91.4779L345.92 233.101C351.752 239.295 355 247.487 355 256C355 264.513 351.752 272.705 345.92 278.899Z"
        fill="currentColor"
      />
    </svg>
  )
}

Chevron.propTypes = iconPropType

export default Chevron
