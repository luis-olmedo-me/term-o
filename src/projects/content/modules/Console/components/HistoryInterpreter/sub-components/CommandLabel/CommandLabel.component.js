import React from "react";

export const CommandLabel = ({
  value,
  id,
  keywords,
  theme: { keyword, normal },
}) => {
  const words = value ? value.split(" ") : [];

  return words.map((word, index) => {
    const isKeyWord = keywords.includes(word);
    const isLastWord = words.length - 1 === index;

    return (
      <span key={`${id}-word-${index}`} style={isKeyWord ? keyword : normal}>
        {isLastWord ? word : `${word} `}
      </span>
    );
  });
};
