const mainPageButton = document.getElementById("mainPageLink");
const { Script } = Components;

mainPageButton.onclick = () =>
  chrome.tabs.create({ url: "./public/main.html" });

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
