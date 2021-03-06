import React from "react";

export const ElementLabel = ({
  value,
  theme: {
    tag: tagStyle,
    class: classStyle,
    id: idStyle,
    wrapper: wrapperStyle,
  },
}) => {
  const { localName, classList, id } = value;
  const classNames = classList && Array.from(classList).join(".");

  return (
    <span style={wrapperStyle}>
      <span style={tagStyle}>{localName}</span>
      <span style={classStyle}>{classNames && `.${classNames}`}</span>
      <span style={idStyle}>{id && `#${id}`}</span>
    </span>
  );
};
