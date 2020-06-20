function SubOptions({ options }) {
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
  const hasOptions = Boolean(options);

  const scriptContainer = document.createElement("div");
  scriptContainer.classList = ["script-option"];

  const scriptButton = document.createElement("button");
  scriptButton.onclick = callback;

  const textNode = document.createTextNode(text);
  scriptButton.appendChild(textNode);

  scriptContainer.appendChild(scriptButton);

  if (hasOptions) {
    const subOptions = SubOptions({ options });

    scriptButton.onclick = () => {
      const isClosed = subOptions.className.includes("closed");

      subOptions.className = `script-sub-options ${isClosed ? "" : "closed"}`;
    };

    scriptContainer.appendChild(subOptions);

    callback && callback();
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
