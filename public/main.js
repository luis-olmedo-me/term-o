function SubOption({ options }) {
  const scriptContainer = document.createElement("div");
  scriptContainer.classList = ["script-sub-options"];
  console.log(options);

  options.forEach(({ text, callback }) => {
    const scriptButton = document.createElement("button");
    scriptButton.onclick = callback;

    const textNode = document.createTextNode(text);
    scriptButton.appendChild(textNode);

    scriptContainer.appendChild(scriptButton);
  });

  return scriptContainer;
}

function Script({ text = "script", callback, options }) {
  const scriptContainer = document.createElement("div");
  scriptContainer.classList = ["script-option"];

  const scriptButton = document.createElement("button");
  scriptButton.onclick = callback;

  const textNode = document.createTextNode(text);
  scriptButton.appendChild(textNode);

  scriptContainer.appendChild(scriptButton);

  const hasOptions = Boolean(options);
  if (hasOptions) {
    console.log("script", options);
    scriptContainer.appendChild(SubOption({ options }));
  }
  return scriptContainer;
}

const codeCoder = document.getElementById("code-coder");
const codeName = document.getElementById("code-name");
let currentScripts = [];

function createScript() {
  if (codeName.value === "") {
    codeCoder.value = "";
    return;
  }

  const newScripts = [
    ...currentScripts,
    { name: codeName.value, script: codeCoder.value },
  ];

  chrome.storage.local.set({ scriptsBagKey: JSON.stringify(newScripts) });

  location.reload();
}

function focusScript(name, script) {}

chrome.storage.local.get(["scriptsBagKey"], function (result) {
  const customScripts = JSON.parse(result.scriptsBagKey);

  customScripts &&
    customScripts.forEach(({ name, script }) => {
      scripts.appendChild(Script({ text: name, options: [{ text: "save" }] }));
    });

  scripts.appendChild(Script({ text: "+", callback: createScript }));
  currentScripts = customScripts;
});
