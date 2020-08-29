chrome.runtime.onMessage.addListener(function (
  { message, customCode, query },
  sender
) {
  if (message == "EXECUTE_SCRIPT_BAG") {
    const showStatus = (theme, text) => {
      chrome.runtime.sendMessage({
        type: "STATUS_SCRIPT_BAG",
        theme,
        text,
      });
    };

    try {
      const env = JSON.parse(query);
      Object.keys(env).forEach((envName) => {
        const envVariable = env[envName];

        env[envName].value = envVariable.value || envVariable.defaultValue;
      });

      eval(customCode);
      showStatus("success", "Code successfuly executed");
      contentSnackBarAPI.setMessage(
        "Good news",
        "Code successfuly executed",
        "success"
      );
    } catch ({ name: errorName }) {
      showStatus("error", errorName);
    }
  }
});
