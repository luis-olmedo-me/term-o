const mainPageButton = document.getElementById("mainPageLink");
const popupWrapper = document.getElementById("popup");

const { Script, SnackBar, Input } = Components;
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

    const configurationMenu = document.getElementById("configuration");
    const configurationInputs = document.getElementById("configuration-inputs");
    const openConfiguration = (query) => {
      const queryParsed = JSON.parse(query);
      const envVariables = Object.keys(queryParsed);

      envVariables.forEach((env) => {
        const envVariable = queryParsed[env];
        console.log(env, envVariable, Input(envVariable));

        configurationInputs.appendChild(Input(envVariable));
      });

      configurationMenu.className = "script-configuration open";
    };

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
      const ConfigurationMenu = hasQuery
        ? [{ text: "adjust", callback: () => openConfiguration(query) }]
        : [];

      scripts.appendChild(
        Script({
          text: name,
          options: [
            ...ConfigurationMenu,
            { text: "Run", callback: callbackRun },
          ],
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
