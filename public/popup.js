const $mainPageButton = $("#mainPageLink");
const $popupWrapper = $("#popup");
const $scripts = $("#scripts");

const { Script, SnackBar, Input } = Components;
const [$snackbar, showSnackBarMessage] = SnackBar();
let queries = [];

$popupWrapper.append($snackbar);

$mainPageButton.on("click", () =>
  chrome.tabs.create({ url: "./public/main.html" })
);

const backgroundRequest = (key, data, callback) => {
  if (key) {
    const requestData = {
      WEB_BOTS_REQUEST: key,
      data,
    };

    chrome.runtime.sendMessage(
      requestData,
      (response) => callback && callback(response)
    );
  }
};

backgroundRequest("get_scripts", null, ({ response: scriptsResponse }) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    const customScripts = scriptsResponse || [];

    const $configurationMenu = $("#configuration");
    const $configurationInputs = $("#configuration-inputs");
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

      $configurationInputs.empty();
      envVariables.forEach((env) => {
        const envVariable = queryParsed[env];

        $configurationInputs.append(
          Input({ ...envVariable, saveEnvChanges, name: env })
        );
      });

      const $runButton = Script({
        text: "Run",
        callback: () => {
          runCallback();
        },
      });
      $configurationMenu.append($runButton);

      const $goBackButton = Script({
        text: "Go Back",
        callback: () => {
          $configurationMenu.removeClass("open");

          setTimeout(() => {
            $goBackButton.remove();
            $runButton.remove();
          }, 500);
        },
      });
      $configurationMenu.append($goBackButton);

      $configurationMenu.addClass("open");
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
      const configurationMenu = hasQuery
        ? [
            {
              text: "Adjust",
              callback: () => openConfiguration(queryParsed, callbackRun, name),
            },
          ]
        : [];

      $scripts.append(
        Script({
          text: name,
          options: [
            ...configurationMenu,
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
