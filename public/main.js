const codeCoder = document.getElementById("code-coder");
const codeName = document.getElementById("code-name");
const scripts = document.getElementById("scripts");
let currentScripts = [];
const { Script, ErrorAlert } = Components;

const storeScripts = (scripts) => {
  chrome.storage.local.set({ scriptsBagKey: JSON.stringify(scripts) });

  updateUI();
};

const createScript = () => {
  let number = 0;
  let isNumberAvaiable = false;
  let avaiableName = "";
  const defaultName = "New Script";

  while (!isNumberAvaiable) {
    avaiableName = `${defaultName} ${number}`;
    console.log("loop infinito?");

    isNumberAvaiable = currentScripts.every(
      ({ name }) => name !== avaiableName
    );

    number++;
  }

  const newScripts = [...currentScripts, { name: avaiableName, script: "" }];

  storeScripts(newScripts);
};

const saveScript = (name) => {
  const newName = codeName.value;
  const isNewNameRepeated = currentScripts.some(({ name }) => name === newName);

  if (isNewNameRepeated) {
    return ErrorAlert("The name given is already taken!");
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
    const customScripts = JSON.parse(result.scriptsBagKey);

    customScripts &&
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

updateUI();
