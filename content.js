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

      eval(customCode);
      showStatus("success", "Code successfuly executed");
    } catch ({ name: errorName }) {
      showStatus("error", errorName);
    }
  }
});
