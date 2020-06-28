const mainPageButton = document.getElementById("mainPageLink");
const popupWrapper = document.getElementById("popup");

const { Script, SnackBar } = Components;
const [snackbar, showSnackBarMessage] = SnackBar();
let queries = [];

popupWrapper.appendChild(snackbar);

mainPageButton.onclick = () =>
  chrome.tabs.create({ url: "./public/main.html" });

const scripts = document.getElementById("scripts");

chrome.storage.local.get(["scriptsBagKey"], function ({ scriptsBagKey }) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    const customScripts = scriptsBagKey ? JSON.parse(scriptsBagKey) : [];

    customScripts.forEach(({ name, script, query }) => {
      queries.push({ name, query });

      const callbackRun = () => {
        chrome.tabs.sendMessage(activeTab.id, {
          message: "EXECUTE_SCRIPT_BAG",
          customCode: script,
          query: queries.find(({ name: queryName }) => queryName === name)
            .query,
        });
      };

      const hasQuery = query && query !== "";

      const ConfigurationMenu = hasQuery ? [{ text: "adjust" }] : [];

      scripts.appendChild(
        Script({
          text: name,
          options: [...ConfigurationMenu, { text: "Run", callbackRun }],
        })
      );
    });
  });
});

chrome.runtime.onMessage.addListener(function ({ type, theme, text }) {
  if (type == "STATUS_SCRIPT_BAG") {
    showSnackBarMessage(theme, text);
  }
});
