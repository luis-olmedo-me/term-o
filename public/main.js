function Script(props) {
  const scriptContainer = document.createElement("div");
  scriptContainer.classList = ["script-option"];

  const scriptButton = document.createElement("button");
  const text = document.createTextNode("script test");
  scriptButton.appendChild(text);

  scriptContainer.appendChild(scriptButton);

  return scriptContainer;
}

const root = document.getElementById("scripts");
root.appendChild(Script());
