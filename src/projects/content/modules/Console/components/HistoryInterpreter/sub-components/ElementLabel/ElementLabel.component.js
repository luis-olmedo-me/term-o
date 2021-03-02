import React from "react";

export const ElementLabel = ({ value, theme: { color, tagNameFontWeight } }) => {
  const { localName, classList, id } = value;
  const classNames = classList && Array.from(classList).join(".");

  return (
    <>
      <span style={{ color, fontWeight: tagNameFontWeight }}>{localName}</span>
      <span style={{ color }}>{classNames && `.${classNames}`}</span>
      <span style={{ color }}>{id && `#${id}`} </span>
    </>
  );
};
