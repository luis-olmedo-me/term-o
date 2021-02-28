export const parseStylesInArray = (arrayStyles) => {
  let newStyles = {};

  for (let index = 0; index < arrayStyles.length; index++) {
    const styleName = arrayStyles[index];

    index++;
    newStyles[styleName] = arrayStyles[index];
  }

  return newStyles;
};

export const tryCatch = (callbackSuccess, callbackError = () => {}) => {
  try {
    return callbackSuccess();
  } catch {
    return callbackError();
  }
};
