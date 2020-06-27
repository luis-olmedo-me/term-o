const mainPageButton = document.getElementById("mainPageLink");
const popupWrapper = document.getElementById("popup");

const { Script, SnackBar } = Components;
const [snackbar, showSnackBarMessage] = SnackBar();

popupWrapper.appendChild(snackbar);

mainPageButton.onclick = () =>
  chrome.tabs.create({ url: "./public/main.html" });

const scripts = document.getElementById("scripts");

chrome.storage.local.get(["scriptsBagKey"], function ({ scriptsBagKey }) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    const customScripts = scriptsBagKey ? JSON.parse(scriptsBagKey) : [];

    customScripts.forEach(({ name, script }) => {
      const callback = () => {
        chrome.tabs.sendMessage(activeTab.id, {
          message: "EXECUTE_SCRIPT_BAG",
          customCode: script,
        });
      };

      scripts.appendChild(
        Script({ text: name, options: [{ text: "Run", callback }] })
      );
    });
  });
});

chrome.runtime.onMessage.addListener(function ({ type, error }) {
  if (type == "ERROR_SCRIPT_BAG") {
    showSnackBarMessage("error", error);
  }
});
