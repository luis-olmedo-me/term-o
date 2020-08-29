chrome.runtime.onMessage.addListener(function (
  { message, customCode, query },
  sender
) {
  if (message == "EXECUTE_SCRIPT_BAG") {
    const env = JSON.parse(query);
    Object.keys(env).forEach((envName) => {
      const envVariable = env[envName];

      env[envName].value = envVariable.value || envVariable.defaultValue;
    });
    const scope = { snackbar: contentSnackBarAPI, env, window };

    try {
      (function webBot(code) {
        eval(code);
      }.call(scope, customCode));
    } catch ({ name }) {
      contentSnackBarAPI.setMessage("Error on web bot", name);
    }
  }
});
