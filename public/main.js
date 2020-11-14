const $codeQuery = $("#code-query");
const $codeCoder = $("#code-coder");
const $codeName = $("#code-name");
const $codeCommand = $("#code-command");
const $mainWrapper = $("#main");
const $scripts = $("#scripts");

let currentScripts = [];
const { Script, SnackBar } = Components;
const [$snackbar, showSnackBarMessage] = SnackBar();

const getParsedQuery = (query) => {
  let env = {};

  try {
    env = JSON.parse(query);
  } catch ({ message }) {
    showSnackBarMessage("error", message);
  } finally {
    return JSON.stringify(env);
  }
};

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

const storeScripts = (scripts) => {
  // chrome.storage.local.set({ scriptsBagKey: JSON.stringify(scripts) });

  // backgroundRequest("get_queries", (response) => {
  //   console.log("response", response);
  // });

  updateUI();
};

const createScript = () => {
  backgroundRequest("create_script", null, ({ response: newScript }) => {
    showSnackBarMessage(
      "success",
      `Script ${newScript.availableName} has been created!`
    );
  });

  updateUI();
};

const saveScript = (name) => {
  const updatedScript = {
    name: $codeName.val(),
    script: $codeCoder.val(),
    query: getParsedQuery($codeQuery.val()),
    command: $codeCommand.val(),
  };

  const data = {
    oldName: name,
    updatedScript,
  };

  backgroundRequest("update_script", data, ({ status }) => {
    if (status === "success") {
      showSnackBarMessage("success", "Changes made has been saved!");
    } else {
      showSnackBarMessage("error", "The name given is already taken!");
    }
  });

  updateUI();
};

const deleteScript = (name) => {
  const newScripts = currentScripts.filter((script) => {
    return script.name !== name;
  });

  storeScripts(newScripts);
  showSnackBarMessage("success", `Script ${name} has been deleted!`);
};

function updateUI() {
  $scripts.empty();

  backgroundRequest("get_scripts", null, ({ response: scriptsResponse }) => {
    scriptsResponse.forEach(({ name, script, query, command }) => {
      const callback = () => {
        $codeName.val(name);
        $codeCoder.val(script);
        $codeQuery.val(query);
        $codeCommand.val(command);
      };

      $scripts.append(
        Script({
          text: name,
          callback,
          options: [
            { text: "Delete", callback: () => deleteScript(name) },
            { text: "Save", callback: () => saveScript(name) },
          ],
        })
      );
    });

    $scripts.append(Script({ text: "+", callback: createScript }));
    currentScripts = scriptsResponse;
  });
}

$mainWrapper.append($snackbar);
updateUI();
