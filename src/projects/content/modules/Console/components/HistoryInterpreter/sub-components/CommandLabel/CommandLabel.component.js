import React from "react";

export const CommandLabel = ({
  value,
  id,
  keywords,
  theme: { keywordColor, color, keywordFontWeight, fontWeight },
}) => {
  const words = value ? value.split(" ") : [];

  return words.map((word, index) => {
    const isKeyWord = keywords.includes(word);

    return (
      <span
        key={`${id}-word-${index}`}
        style={{
          color: isKeyWord ? keywordColor : color,
          fontWeight: isKeyWord ? keywordFontWeight : fontWeight,
        }}
      >
        {`${word} `}
      </span>
    );
  });
};
