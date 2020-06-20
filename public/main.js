function Script({ text = "script", callback }) {
  const scriptContainer = document.createElement("div");
  scriptContainer.classList = ["script-option"];

  const scriptButton = document.createElement("button");
  callback && (scriptButton.onclick = new Function(callback));

  const textNode = document.createTextNode(text);
  scriptButton.appendChild(textNode);

  scriptContainer.appendChild(scriptButton);

  return scriptContainer;
}

// const scripts = document.getElementById("scripts");
// for (let index = 0; index < 3; index++) {
//   scripts.appendChild(
//     Script({ text: `script ${index}`, callback: "console.log('a callback')" })
//   );
//   console.log(index);
// }

const info = [{ name: "custom script", script: "console.log()" }];

localStorage.setItem("scriptsBagKey", JSON.stringify(info));
const myScripts = JSON.parse(localStorage.getItem("scriptsBagKey"));

myScripts.forEach(({ name, script }) => {
  scripts.appendChild(Script({ text: name }));
});
