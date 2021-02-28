import React from "react";

export const ElementLabel = ({ value }) => {
  const { localName, className } = value;

  return (
    <>
      <span>{localName}</span>
      <span>{className && `.${className}`} </span>
    </>
  );
};
