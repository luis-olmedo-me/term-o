const mainPageButton = document.getElementById("mainPageLink");

mainPageButton.onclick = () =>
  chrome.tabs.create({ url: "./public/main.html" });

function Script({ text = "script", callback }) {
  const scriptContainer = document.createElement("div");
  scriptContainer.classList = ["script-option"];

  const scriptButton = document.createElement("button");
  scriptButton.onclick = callback;

  const textNode = document.createTextNode(text);
  scriptButton.appendChild(textNode);

  scriptContainer.appendChild(scriptButton);

  return scriptContainer;
}

const scripts = document.getElementById("scripts");

chrome.storage.local.get(["scriptsBagKey"], function (result) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    const customScripts = JSON.parse(result.scriptsBagKey);

    customScripts.forEach(({ name, script }) => {
      const callback = () =>
        chrome.tabs.sendMessage(activeTab.id, {
          message: "EXECUTE_SCRIPT_BAG",
          customCode: script,
        });

      scripts.appendChild(Script({ text: name, callback }));
    });
  });
});
