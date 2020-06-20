function Script({ text = "script", callback }) {
  const scriptContainer = document.createElement("div");
  scriptContainer.classList = ["script-option"];

  const scriptButton = document.createElement("button");

  const textNode = document.createTextNode(text);
  scriptButton.appendChild(textNode);

  scriptContainer.appendChild(scriptButton);

  return scriptContainer;
}

chrome.storage.local.get(["scriptsBagKey"], function (result) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    const callback = () =>
      chrome.tabs.sendMessage(activeTab.id, {
        message: "EXECUTE_SCRIPT_BAG",
        customCode: result.scriptsBagKey,
      });

    scripts.appendChild(Script({ text: "My Custom Script", callback }));
  });
});
