chrome.runtime.onMessage.addListener(function (message, sender) {
  if (message.message == "EXECUTE_SCRIPT_BAG") {
    try {
      const script = new Function(message.customCode);

      script();
    } catch (error) {
      console.log(error);
      // sender({ message: "ERROR_SCRIPT_BAG", error });
      chrome.runtime.sendMessage({
        type: "ERROR_SCRIPT_BAG",
        error: error.name,
      });
    }
  }
});
