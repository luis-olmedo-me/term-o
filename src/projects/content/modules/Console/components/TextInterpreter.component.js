import React from "react";

export const TextInterpreter = ({ texts }) => {
  console.log("texts", texts);
  return (
    <div>
      {texts.map((text, index) => {
        return <p key={index}>{text.map(({ label }) => label)}</p>;
      })}
    </div>
  );
};
