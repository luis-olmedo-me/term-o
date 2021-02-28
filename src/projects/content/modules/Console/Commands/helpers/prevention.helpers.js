export const tryCatch = (callbackSuccess, callbackError = () => {}) => {
  try {
    return callbackSuccess();
  } catch {
    return callbackError();
  }
};
