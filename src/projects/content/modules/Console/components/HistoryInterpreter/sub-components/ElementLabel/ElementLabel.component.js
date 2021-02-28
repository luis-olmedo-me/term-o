import React from "react";

export const ElementLabel = ({ value }) => {
  const { localName, classList, id } = value;
  const classNames = classList && Array.from(classList).join(".");

  return (
    <>
      <span style={{ color: "#EC00E2", fontWeight: "bold" }}>{localName}</span>
      <span style={{ color: "#EC00E2" }}>{classNames && `.${classNames}`}</span>
      <span style={{ color: "#EC00E2" }}>{id && `#${id}`} </span>
    </>
  );
};
