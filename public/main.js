const codeCoder = document.getElementById("code-coder");
const codeName = document.getElementById("code-name");
const scripts = document.getElementById("scripts");
let currentScripts = [];
const { Script } = Components;

const storeScripts = (scripts) => {
  chrome.storage.local.set({ scriptsBagKey: JSON.stringify(scripts) });

  updateUI();
};

const createScript = () => {
  const newScripts = [...currentScripts, { name: "New Script", script: "" }];

  storeScripts(newScripts);
};

const saveScript = (name) => {
  const newScripts = currentScripts.map((script) => {
    return script.name !== name
      ? script
      : {
          name: codeName.value,
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
