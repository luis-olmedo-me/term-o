const codeCoder = document.getElementById("code-coder");
const codeName = document.getElementById("code-name");
const mainWrapper = document.getElementById("main");
const scripts = document.getElementById("scripts");
let currentScripts = [];
const { Script, ErrorAlert } = Components;
const [snackbar, showSnackBarMessage] = ErrorAlert();

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

  const newScripts = [...currentScripts, { name: availableName, script: "" }];

  storeScripts(newScripts);
};

const saveScript = (name) => {
  const newName = codeName.value;
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
          script: codeCoder.value,
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
};

function updateUI() {
  scripts.innerHTML = "";

  chrome.storage.local.get(["scriptsBagKey"], function (result) {
    const customScripts = JSON.parse(result.scriptsBagKey) || [];

    customScripts.forEach(({ name, script }) => {
      const callback = () => {
        codeName.value = name;
        codeCoder.value = script;
      };

      scripts.appendChild(
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

    scripts.appendChild(Script({ text: "+", callback: createScript }));
    currentScripts = customScripts;
  });
}

mainWrapper.appendChild(snackbar);
updateUI();
