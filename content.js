chrome.runtime.onMessage.addListener(function (message, callback) {
  if (message.message == "EXECUTE_SCRIPT_BAG") {
    eval(message.customCode);
  }
});
