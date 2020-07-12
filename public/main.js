const $codeQuery = $("#code-query");
const $codeCoder = $("#code-coder");
const $codeName = $("#code-name");
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

const storeScripts = (scripts) => {
  chrome.storage.local.set({ scriptsBagKey: JSON.stringify(scripts) });

  updateUI();
};

const createScript = () => {
  let number = 0;
  let isNumberAvailable = false;
  let availableName = "";
  const defaultName = "New bot";

  while (!isNumberAvailable) {
    availableName = `${defaultName} ${number}`;

    isNumberAvailable = currentScripts.every(
      ({ name }) => name !== availableName
    );

    number++;
  }

  const newScripts = [
    ...currentScripts,
    { name: availableName, script: "", query: "" },
  ];

  storeScripts(newScripts);
  showSnackBarMessage("success", `Script ${availableName} has been created!`);
};

const saveScript = (name) => {
  const newName = $codeName.val();
  const isNewNameRepeated = currentScripts.some(
    ({ name: scriptName }) => scriptName === newName && scriptName !== name
  );

  if (isNewNameRepeated) {
    return showSnackBarMessage("error", "The name given is already taken!");
  }

  const newScripts = currentScripts.map((script) => {
    return script.name !== name
      ? script
      : {
          name: newName,
          script: $codeCoder.val(),
          query: getParsedQuery($codeQuery.val()),
        };
  });

  storeScripts(newScripts);
  showSnackBarMessage("success", "Changes made has been saved!");
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

  chrome.storage.local.get(["scriptsBagKey"], function (result) {
    const customScripts = JSON.parse(result.scriptsBagKey) || [];

    customScripts.forEach(({ name, script, query }) => {
      const callback = () => {
        $codeName.val(name);
        $codeCoder.val(script);
        $codeQuery.val(query);
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
    currentScripts = customScripts;
  });
}

$mainWrapper.append($snackbar);
updateUI();
