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
  const customScripts = JSON.parse(result.scriptsBagKey);

  customScripts.forEach(({ name, script }) => {
    scripts.appendChild(Script({ text: name }));
  });
});
