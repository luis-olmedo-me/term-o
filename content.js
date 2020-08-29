chrome.runtime.onMessage.addListener(function (
  { message, customCode, query },
  sender
) {
  if (message == "EXECUTE_SCRIPT_BAG") {
    const webBots = {
      snackbar: contentSnackBarAPI,
    };

    try {
      const env = JSON.parse(query);
      Object.keys(env).forEach((envName) => {
        const envVariable = env[envName];

        env[envName].value = envVariable.value || envVariable.defaultValue;
      });

      eval(customCode);
    } catch ({ name }) {
      contentSnackBarAPI.setMessage(`Error on web bot`, name);
    }
  }
});
