chrome.runtime.onMessage.addListener(function (message, sender) {
  if (message.message == "EXECUTE_SCRIPT_BAG") {
    const showStatus = (theme, text) => {
      chrome.runtime.sendMessage({
        type: "STATUS_SCRIPT_BAG",
        theme,
        text,
      });
    };

    try {
      eval(message.customCode);
      showStatus("success", "Code successfuly executed");
    } catch ({ name: errorName }) {
      showStatus("error", errorName);
    }
  }
});
