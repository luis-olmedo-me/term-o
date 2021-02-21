import React from "react";

export const Terminal = () => {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.235 14c0 .33-.098.659-.28.906L13.72 27.259c-.296.445-.79.741-1.367.741H7.412a1.652 1.652 0 01-1.647-1.647c0-.33.099-.659.28-.906L13.67 14 6.045 2.553a1.554 1.554 0 01-.28-.906C5.765.741 6.506 0 7.412 0h4.941c.576 0 1.07.296 1.367.741l8.235 12.353c.182.247.28.577.28.906z"
        fill="currentColor"
      />

      <defs>
        <clipPath>
          <path fill="transparent" d="M0 0h28v28H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
