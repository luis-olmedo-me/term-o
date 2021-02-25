const parseStylesInArray = (arrayStyles) => {
  let newStyles = {};

  for (let index = 0; index < arrayStyles.length; index++) {
    const styleName = arrayStyles[index];

    index++;
    newStyles[styleName] = arrayStyles[index];
  }

  return newStyles;
};

const callback = ([elements, ...styles]) => {
  const parsedStyles = parseStylesInArray(styles);
  const hasElements = Boolean(elements?.length);

  if (!hasElements) {
    return [{ label: "Error: Not valid elements to apply styles", value: {} }];
  }

  elements.forEach(({ value }) => {
    Object.keys(parsedStyles).forEach((styleName) => {
      const styleValue = parsedStyles[styleName];

      if (value) {
        value.style[styleName] = styleValue;
      }
    });
  });

  return [{ label: "Styles Applied", value: parsedStyles }];
};

export const css = {
  css: {
    callback,
  },
};
