import React from "react";

export const CommandLabel = ({ value, id, keywords }) => {
  const words = value ? value.split(" ") : [];

  return words.map((word, index) => {
    const isKeyWord = keywords.includes(word);

    return (
      <span
        key={`${id}-word-${index}`}
        style={{
          color: isKeyWord ? "#E46000" : "#111",
          fontWeight: isKeyWord ? "bold" : "normal",
        }}
      >
        {`${word} `}
      </span>
    );
  });
};
