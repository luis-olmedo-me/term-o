export const executeCode = (codeToExecute, scope, onError) => {
  try {
    (function webBot(code) {
      eval(code);
    }.call(scope, codeToExecute));
  } catch (error) {
    onError(error);
  }
};
