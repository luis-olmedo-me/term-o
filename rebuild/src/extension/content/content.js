chrome.runtime.onMessage.addListener(function ({ message, customCode, query }) {
  if (message == "EXECUTE_SCRIPT_BAG") {
    const options = JSON.parse(query);
    const environment = Object.keys(options).reduce((environment, name) => {
      const env = options[name];

      return { ...environment, [name]: env.value || env.defaultValue };
    }, {});

    const scope = { window, contentSnackBarAPI, environment };

    try {
      (function webBot(code) {
        eval(code);
      }.call(scope, customCode));
    } catch ({ stack, message }) {
      const stackFirstPart = stack.split("\n")[0];

      contentSnackBarAPI.setMessage(stackFirstPart, message, "error");
    }
  }
});
