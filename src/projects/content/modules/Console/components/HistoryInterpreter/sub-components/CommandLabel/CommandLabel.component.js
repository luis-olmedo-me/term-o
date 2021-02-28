import React from "react";

export const CommandLabel = ({ label, id }) => {
  const words = label ? label.split(" ") : [];

  return words.map((word, index) => {
    const isKeyWord = ["dom-get", "css"].includes(word);

    return (
      <span
        key={`${id}-word-${index}`}
        style={{
          color: isKeyWord ? "#E46000" : "#111",
          fontWeight: isKeyWord ? "bold" : "normal",
        }}
      >
        {word}{" "}
      </span>
    );
  });
};
