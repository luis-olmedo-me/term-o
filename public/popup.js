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
    const openConfiguration = (queryParsed, runCallback, scriptName) => {
      const envVariables = Object.keys(queryParsed);

      const saveEnvChanges = (newValue, env) => {
        const queryEdited = queries.find(({ name }) => name === scriptName);
        const queryEditedParsed = JSON.parse(queryEdited.query);

        queryEditedParsed[env].value = newValue;

        queries = queries.map((query) => {
          const name = query.name;

          return {
            ...query,
            query:
              name === scriptName
                ? JSON.stringify(queryEditedParsed)
                : query.query,
          };
        });
      };

      configurationInputs.innerHTML = null;
      envVariables.forEach((env) => {
        const envVariable = queryParsed[env];

        configurationInputs.appendChild(
          Input({ ...envVariable, saveEnvChanges, name: env })
        );
      });

      const runButton = Script({
        text: "Run",
        callback: () => {
          runCallback();
          configurationMenu.className = "script-configuration";
          runButton.remove();
        },
      });
      configurationMenu.appendChild(runButton);

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

      const queryParsed = JSON.parse(query);
      const hasQuery = Boolean(Object.keys(queryParsed).length);
      const ConfigurationMenu = hasQuery
        ? [
            {
              text: "adjust",
              callback: () => openConfiguration(queryParsed, callbackRun, name),
            },
          ]
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
