const codeCoder = document.getElementById("code-coder");
const codeName = document.getElementById("code-name");
const scripts = document.getElementById("scripts");
let currentScripts = [];
const { Script } = Components;

function saveScripts(scripts) {
  chrome.storage.local.set({ scriptsBagKey: JSON.stringify(scripts) });

  updateUI();
}

function createScript() {
  if (codeName.value === "") {
    codeCoder.value = "";
    return;
  }

  const newScripts = [
    ...currentScripts,
    { name: codeName.value, script: codeCoder.value },
  ];

  saveScripts(newScripts);
}

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

        const saveCallback = () => {
          const newScripts = currentScripts.map((script) => {
            return script.name !== name
              ? script
              : {
                  name: codeName.value,
                  script: codeCoder.value,
                };
          });

          saveScripts(newScripts);
          currentScripts = newScripts;
        };

        scripts.appendChild(
          Script({
            text: name,
            callback,
            options: [{ text: "save", callback: saveCallback }],
          })
        );
      });

    scripts.appendChild(Script({ text: "+", callback: createScript }));
    currentScripts = customScripts;
  });
}

updateUI();
