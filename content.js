chrome.runtime.onMessage.addListener(function (message, callback) {
  if (message.message == "sorete") {
    eval(message.customCode);
  }
});
