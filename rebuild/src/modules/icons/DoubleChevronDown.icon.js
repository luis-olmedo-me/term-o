import React from "react";

export const DoubleChevronDown = ({ className }) => {
  return (
    <svg
      width={6}
      height={6}
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g fill="currentColor">
        <path d="M2.99 3a.283.283 0 01-.164-.051l-2.25-1.5A.298.298 0 01.44 1.2V.3a.3.3 0 01.3-.3C.8 0 .86.018.906.051L2.99 1.44 5.076.051A.283.283 0 015.24 0a.3.3 0 01.3.3v.9a.298.298 0 01-.135.249l-2.25 1.5A.283.283 0 012.99 3z" />
        <path d="M2.99 6a.283.283 0 01-.164-.051l-2.25-1.5A.298.298 0 01.44 4.2v-.9a.3.3 0 01.3-.3c.06 0 .12.018.165.051L2.99 4.44l2.085-1.389A.283.283 0 015.24 3a.3.3 0 01.3.3v.9a.298.298 0 01-.135.249l-2.25 1.5A.283.283 0 012.99 6z" />
      </g>
      <defs>
        <clipPath>
          <path
            fill="currentColor"
            transform="rotate(90 3 3)"
            d="M0 0h6v6H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
