chrome.runtime.onMessage.addListener(function (message, callback) {
  if (message.message == "EXECUTE_SCRIPT_BAG") {
    try {
      const script = new Function(message.customCode);

      script();
    } catch (error) {
      console.error("Got an error executing..");
    }
  }
});
