import { iconPropType } from '@src/constants/icon.constants'

const Thunder = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M168.5 81C161.6 81 156 86.6 156 93.5001V256.001C156 262.901 161.6 268.501 168.5 268.501H230.999V418.502C230.999 424.452 235.187 429.577 241.024 430.752C246.862 431.927 252.712 428.839 255.024 423.352L355.024 185.851C356.649 181.988 356.224 177.576 353.911 174.088C351.599 170.6 347.686 168.5 343.499 168.5H268.499V93.5001C268.499 86.6 262.899 81 255.999 81H168.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

Thunder.propTypes = iconPropType

export default Thunder
