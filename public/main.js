function Script({ text = "script", callback }) {
  const scriptContainer = document.createElement("div");
  scriptContainer.classList = ["script-option"];

  const scriptButton = document.createElement("button");
  scriptButton.onclick = callback;

  const textNode = document.createTextNode(text);
  scriptButton.appendChild(textNode);

  scriptContainer.appendChild(scriptButton);

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
    { name: "My great script", script: "console.log('hola')" },
  ];

  chrome.storage.local.set({ scriptsBagKey: JSON.stringify(newScripts) });

  location.reload();
}

chrome.storage.local.get(["scriptsBagKey"], function (result) {
  const customScripts = JSON.parse(result.scriptsBagKey);

  customScripts.forEach(({ name, script }) => {
    scripts.appendChild(Script({ text: name }));
  });

  scripts.appendChild(Script({ text: "+", callback: createScript }));
  currentScripts = customScripts;
});
