chrome.runtime.onMessage.addListener(function (
  { message, customCode, query },
  sender
) {
  if (message == "EXECUTE_SCRIPT_BAG") {
    const options = JSON.parse(query);
    const environment = Object.keys(options).reduce((environment, name) => {
      const env = options[name];

      return { ...environment, [name]: env.value || env.defaultValue };
    }, {});

    const scope = { window, contentSnackBarAPI, terminal, environment };

    try {
      (function webBot(code) {
        eval(code);
      }.call(scope, customCode));
    } catch ({ name }) {
      contentSnackBarAPI.setMessage("Error on web bot", name);
    }
  }
});
